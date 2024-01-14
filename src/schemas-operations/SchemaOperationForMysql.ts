import {ValidationSchema } from "../contacts/ValidationRule";

export class SchemaOperationForMysql {
    public static integerTypes: any = {
        smallint: { min: '-32768', max: '32767' },
        integer: { min: '-2147483648', max: '2147483647' },
        bigint: { min: '-9223372036854775808', max: '9223372036854775807' },
    };

    static async getTableSchema(database: any): Promise<any[]> {
        try {
            const result = await database.query(`
                    SELECT table_name,column_name, data_type, character_maximum_length, is_nullable, column_default
                    FROM 
                    information_schema.columns
                    WHERE 
                    table_name = 'menus' 
                    ORDER BY ordinal_position ASC;
        `);

            return result.rows;
        } catch (error) {
            console.error('Error retrieving table schema:', error);
            return [];
        }
    }

    static generateColumnRules(tableSchema: any[]): ValidationSchema {
        const rules: ValidationSchema = {};
        const skipColumnValues: any = process.env.SKIP_COLLUMNS ?? "";
        const skipColumns: string[] = skipColumnValues.split(',');

        tableSchema.forEach(({ table_name, column_name, data_type, character_maximum_length, is_nullable, column_default }) => {
            if (skipColumns.includes(column_name)) {
                return;
            }

            let columnRules = [];
            columnRules.push(is_nullable === 'YES' ? 'nullable' : 'required');
            let type = data_type;

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
        
                    // prevent int(xx) for mysql
                    intType = intType.replace(/\([^)]+\)/, '');
        
                    if (!self.integerTypes[intType]) {
                        intType = 'int';
                    }
        
                    columnRules.push('min:' + self.integerTypes[intType][sign][0]);
                    columnRules.push('max:' + self.integerTypes[intType][sign][1]);
                    break;
                case type.includes('double') || type.includes('decimal') || type.includes('dec') || type.includes('float'):
                    columnRules.push('numeric');
                    break;
                case type.includes('enum') || type.includes('set'):
                    const matches = type.match(/'([^']*)'/g).map(match => match.slice(1, -1));
                    columnRules.push('string');
                    columnRules.push('in:' + matches.join(','));
                    break;
                case type.includes('year'):
                    columnRules.push('integer');
                    columnRules.push('min:1901');
                    columnRules.push('max:2155');
                    break;
                case type === 'date' || type === 'time':
                    columnRules.push('date');
                    break;
                case type === 'timestamp':
                    columnRules.push('date');
                    columnRules.push('after_or_equal:1970-01-01 00:00:01');
                    columnRules.push('before_or_equal:2038-01-19 03:14:07');
                    break;
                case type === 'json':
                    columnRules.push('json');
                    break;
                default:
                    // Skip BINARY and BLOB for now
                    break;
            }
            rules[column_name] = columnRules;
        })
        return rules;
    }
}
