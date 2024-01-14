import { errorMessage } from "../config/messages";
import { ValidationSchema } from "../contacts/ValidationRule";

export class SchemaOperationForSqlite {
    public integerTypes: any = {
        integer: { min: '-9223372036854775808', max: '9223372036854775807' }
    };

    public async getTableSchema(database: any, table: string): Promise<any[]> {
          const tableExist=await database.query(`SELECT name FROM sqlite_master WHERE type='table' AND name='${table}';`)
          if(!tableExist.length){
            throw new Error(errorMessage(`The ${table} table is exist!`))
          }
      return await database.query(`PRAGMA table_info('${table}')`)??[]
    }

    public generateColumnRules(tableSchema: any[]): ValidationSchema {
        const rules: ValidationSchema = {};
        const skipColumnValues: any = process.env.SKIP_COLLUMNS ?? "";
        const skipColumns: string[] = skipColumnValues.split(',');

        tableSchema.forEach(({ name, type, notnull, dflt_value, pk }) => {

            if (skipColumns.includes(name) || Boolean(pk)) {
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
