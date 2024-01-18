import { errorMessage } from "../utils/messages";
import { ValidationSchema } from "../contacts/ValidationRule";

export class SchemaOperationForSqlite {
    public integerTypes: any = {
        integer: { min: '-9223372036854775808', max: '9223372036854775807' }
    };

    public async getTableSchema(database: any, table: string): Promise<any[]> {
          const tableExist=await database.query(`SELECT name FROM sqlite_master WHERE type='table' AND name='${table}';`)
          console.log(tableExist);
          
          if(!tableExist.length){
            throw new Error(errorMessage(`The ${table} table is not exist!`))
          }

      return await database.query(`PRAGMA table_info('${table}')`)??[]
    }

    public generateColumnRules(dataTableSchema: any[],selectedColumns:string[],skipColumns:string[]): ValidationSchema {
        
        const rules: ValidationSchema = {};
        let tableSchema=dataTableSchema;

        if (skipColumns.length || selectedColumns.length) {
            tableSchema = tableSchema.filter(({ name }) => {
              return selectedColumns.length ?selectedColumns.includes(name):!skipColumns.includes(name);
            });
          }

        tableSchema.forEach(({ name, type, notnull, dflt_value, pk }) => {

            if (Boolean(pk)) {
                return;
            }

            let columnRules = [];
            columnRules.push(Boolean(notnull) ? 'nullable' : 'required');
            let dataType = type.toLowerCase();

            switch (true) {
                case dataType === 'tinyint(1)':
                    columnRules.push('integer');
                    break;
                case dataType.includes('varchar') || dataType === 'text':
                    columnRules.push('string');
                    if (dataType.includes('varchar')) columnRules.push('max:' + parseInt(dataType.replace(/\D/g, ''), 10));
                    break;
                case dataType === 'integer':
                    columnRules.push('integer');
                    columnRules.push('min:' + this.integerTypes.integer.min);
                    columnRules.push('max:' + this.integerTypes.integer.max);
                    break;
                case dataType.includes('real') || dataType.includes('numeric') || dataType.includes('float'):
                    // Add more specific validation as needed
                    columnRules.push('numeric');
                    break;
                case dataType === 'date' || dataType === 'time' || dataType === 'datetime':
                    columnRules.push('date');
                    break;
                default:
                    // Skip BLOB for now
                    break;
            }
            rules[name] = columnRules;
        })
        return rules;
    }
}
