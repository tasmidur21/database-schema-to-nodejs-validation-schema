import { errorMessage, warningMessage } from "../utils/messages";
import {ValidationSchema } from "../contacts/ValidationRule";

export class SchemaOperationForMysql {

    public integerTypes: any = {
        tinyint: {
            unsigned: { min: '0', max: '255' },
            signed: { min: '-128', max: '127' },
        },
        smallint: {
            unsigned: { min: '0', max: '65535' },
            signed: { min: '-32768', max: '32767' },
        },
        mediumint: {
            unsigned: { min: '0', max: '16777215' },
            signed: { min: '-8388608', max: '8388607' },
        },
        int: {
            unsigned: { min: '0', max: '4294967295' },
            signed: { min: '-2147483648', max: '2147483647' },
        },
        bigint: {
            unsigned: { min: '0', max: '18446744073709551615' },
            signed: { min: '-9223372036854775808', max: '9223372036854775807' },
        },
        year:{ //YEAR data type in MySQL allows representation of years in the range '0000' to '2155' and '1901'
            min:"1901",
            max:"2155"
        },
        timestamp:{ //the timestamp range for the TIMESTAMP data type in MySQL is from '1970-01-01 00:00:01' to '2038-01-19 03:14:07'
           min:'1970-01-01 00:00:01',
           max:'2038-01-19 03:14:07'
        }
    };

    public async getTableSchema(database: any,table:string): Promise<any[]> {
          const tableExist=await database.query(`SHOW TABLES LIKE '${table}';`)
          if(!tableExist.length){
            throw new Error(warningMessage(`The ${table} table is not exist!`))
          }
          return await database.query(`SHOW COLUMNS FROM ${table}`)??[];
    }

    public generateColumnRules(dataTableSchema: any[],selectedColumns:string[],skipColumns:string[]): ValidationSchema {
        
        const rules: ValidationSchema = {};
        let tableSchema=dataTableSchema;

        if (skipColumns.length || selectedColumns.length) {
            tableSchema = tableSchema.filter(({ Field }) => {
                return selectedColumns.length ? selectedColumns.includes(Field):!skipColumns.includes(Field);
            });
          }
          
        tableSchema.forEach(({ Field,Type,Null,Key,Default,Extra }) => {

            if (Extra==='auto_increment') {
                return;
            }

            let columnRules = [];
            columnRules.push(Null === 'YES' ? 'nullable' : 'required');
            let type = Type;

            switch (true) {
                case type === 'tinyint(1)':
                    columnRules.push('integer');
                    break;
                case type.includes('char'):
                    columnRules.push('string');
                    columnRules.push('max:' + parseInt(type.replace(/\D/g, ''), 10));
                    break;
                case type === 'text':
                    columnRules.push('string');
                    break;
                case type.includes('int'):
                    columnRules.push('integer');
                    const sign = type.includes('unsigned') ? 'unsigned' : 'signed';
                    let intType = type.split(' unsigned')[0];

                    intType = intType.replace(/\([^)]+\)/, '');
                    
                    if (!(this.integerTypes as any)[intType]) {
                        intType = 'int';
                    }
        
                    columnRules.push('min:' + this.integerTypes[intType][sign].min);
                    columnRules.push('max:' + this.integerTypes[intType][sign].max);
                    break;
                case type.includes('double') || type.includes('decimal') || type.includes('dec') || type.includes('float'):
                    columnRules.push('numeric');
                    break;
                case type.includes('enum') || type.includes('set'):
                    const matches = type.match(/'([^']*)'/g).map((match:any) => match.slice(1, -1));
                    columnRules.push('string');
                    columnRules.push('in:' + matches.join(','));
                    break;
                case type.includes('year'):
                    columnRules.push('integer');
                    columnRules.push('min:'+this.integerTypes.year.min);
                    columnRules.push('max:'+this.integerTypes.year.max);
                    break;
                case type === 'date' || type === 'time':
                    columnRules.push('date');
                    break;
                case type === 'timestamp':
                    columnRules.push('date');
                    columnRules.push('after_or_equal:'+this.integerTypes.timestamp.min);
                    columnRules.push('before_or_equal:'+this.integerTypes.timestamp.max);
                    break;
                case type === 'json':
                    columnRules.push('json');
                    break;
                default:
                    // Skip for other type like Binary,Bit and Spatial Types
                    break;
            }
            rules[Field] = columnRules;
        })
        return rules;
    }
}
