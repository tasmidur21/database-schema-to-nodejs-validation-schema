"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaOperationForPostgres = void 0;
const messages_1 = require("../utils/messages");
class SchemaOperationForPostgres {
    constructor() {
        this.integerTypes = {
            smallint: { min: '-32768', max: '32767' },
            integer: { min: '-2147483648', max: '2147483647' },
            bigint: { min: '-9223372036854775808', max: '9223372036854775807' },
        };
    }
    getTableSchema(database, table) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const tableExist = yield database.query(`SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = '${table}');`);
            if (!tableExist.length) {
                throw new Error((0, messages_1.errorMessage)(`The ${table} table is exist!`));
            }
            const result = yield database.query(`
                    SELECT table_name,column_name, data_type, character_maximum_length, is_nullable, column_default
                    FROM 
                    information_schema.columns
                    WHERE 
                    table_name = '${table}' 
                    ORDER BY ordinal_position ASC;
        `);
            return (_a = result.rows) !== null && _a !== void 0 ? _a : [];
        });
    }
    generateColumnRules(dataTableSchema, selectedColumns, skipColumns) {
        const rules = {};
        let tableSchema = dataTableSchema;
        if (skipColumns.length || selectedColumns.length) {
            tableSchema = tableSchema.filter(({ column_name }) => {
                return selectedColumns.length ? selectedColumns.includes(column_name) : !skipColumns.includes(column_name);
            });
        }
        tableSchema.forEach(({ table_name, column_name, data_type, character_maximum_length, is_nullable, column_default }) => {
            var _a;
            if (column_default.includes('nextval')) {
                return;
            }
            let columnRules = [];
            columnRules.push(is_nullable === 'YES' ? 'nullable' : 'required');
            let type = data_type;
            switch (true) {
                case type === 'boolean':
                    columnRules.push('boolean');
                    break;
                case type.includes('char'):
                    columnRules.push('string');
                    columnRules.push((_a = 'max:' + character_maximum_length) !== null && _a !== void 0 ? _a : '255');
                    break;
                case type === 'text':
                    columnRules.push('string');
                    break;
                case type.includes('int'):
                    columnRules.push('integer');
                    columnRules.push('min:' + this.integerTypes.integer.min.toString());
                    columnRules.push('max:' + this.integerTypes.integer.max.toString());
                    break;
                case type.includes('double') ||
                    type.includes('decimal') ||
                    type.includes('numeric') ||
                    type.includes('real'):
                    columnRules.push('numeric');
                    break;
                case type === 'date' || type.includes('time '):
                    columnRules.push('date');
                    break;
                case type.includes('json'):
                    columnRules.push('json');
                    break;
                default:
                    // Skip for other type
                    break;
            }
            rules[column_name] = columnRules;
        });
        return rules;
    }
}
exports.SchemaOperationForPostgres = SchemaOperationForPostgres;
