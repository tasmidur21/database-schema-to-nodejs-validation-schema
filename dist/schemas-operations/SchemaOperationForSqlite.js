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
exports.SchemaOperationForSqlite = void 0;
const messages_1 = require("../utils/messages");
class SchemaOperationForSqlite {
    constructor() {
        this.integerTypes = {
            integer: { min: '-9223372036854775808', max: '9223372036854775807' }
        };
    }
    getTableSchema(database, table) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const tableExist = yield database.query(`SELECT name FROM sqlite_master WHERE type='table' AND name='${table}';`);
            console.log(tableExist);
            if (!tableExist.length) {
                throw new Error((0, messages_1.errorMessage)(`The ${table} table is not exist!`));
            }
            return (_a = yield database.query(`PRAGMA table_info('${table}')`)) !== null && _a !== void 0 ? _a : [];
        });
    }
    generateColumnRules(dataTableSchema, selectedColumns, skipColumns) {
        const rules = {};
        let tableSchema = dataTableSchema;
        if (skipColumns.length || selectedColumns.length) {
            tableSchema = tableSchema.filter(({ name }) => {
                return selectedColumns.length ? selectedColumns.includes(name) : !skipColumns.includes(name);
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
                    if (dataType.includes('varchar'))
                        columnRules.push('max:' + parseInt(dataType.replace(/\D/g, ''), 10));
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
        });
        return rules;
    }
}
exports.SchemaOperationForSqlite = SchemaOperationForSqlite;
