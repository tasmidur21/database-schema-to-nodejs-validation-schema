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
exports.SchemaOperationForMysql = void 0;
const messages_1 = require("../config/messages");
class SchemaOperationForMysql {
    constructor() {
        this.integerTypes = {
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
            year: {
                min: "1901",
                max: "2155"
            },
            timestamp: {
                min: '1970-01-01 00:00:01',
                max: '2038-01-19 03:14:07'
            }
        };
    }
    getTableSchema(database, table) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const tableExist = yield database.query(`SHOW TABLES LIKE '${table}';`);
            if (!tableExist.length) {
                throw new Error((0, messages_1.warningMessage)(`The ${table} table is not exist!`));
            }
            return (_a = yield database.query(`SHOW COLUMNS FROM ${table}`)) !== null && _a !== void 0 ? _a : [];
        });
    }
    generateColumnRules(tableSchema) {
        var _a;
        const rules = {};
        const skipColumnValues = (_a = process.env.SKIP_COLLUMNS) !== null && _a !== void 0 ? _a : "";
        const skipColumns = skipColumnValues.split(',');
        tableSchema.forEach(({ Field, Type, Null, Key, Default, Extra }) => {
            if (skipColumns.includes(Field) || Extra === 'auto_increment') {
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
                    if (!this.integerTypes[intType]) {
                        intType = 'int';
                    }
                    columnRules.push('min:' + this.integerTypes[intType][sign].min);
                    columnRules.push('max:' + this.integerTypes[intType][sign].max);
                    break;
                case type.includes('double') || type.includes('decimal') || type.includes('dec') || type.includes('float'):
                    columnRules.push('numeric');
                    break;
                case type.includes('enum') || type.includes('set'):
                    const matches = type.match(/'([^']*)'/g).map((match) => match.slice(1, -1));
                    columnRules.push('string');
                    columnRules.push('in:' + matches.join(','));
                    break;
                case type.includes('year'):
                    columnRules.push('integer');
                    columnRules.push('min:' + this.integerTypes.year.min);
                    columnRules.push('max:' + this.integerTypes.year.max);
                    break;
                case type === 'date' || type === 'time':
                    columnRules.push('date');
                    break;
                case type === 'timestamp':
                    columnRules.push('date');
                    columnRules.push('after_or_equal:' + this.integerTypes.timestamp.min);
                    columnRules.push('before_or_equal:' + this.integerTypes.timestamp.max);
                    break;
                case type === 'json':
                    columnRules.push('json');
                    break;
                default:
                    // Skip for other type like Binary,Bit and Spatial Types
                    break;
            }
            rules[Field] = columnRules;
        });
        return rules;
    }
}
exports.SchemaOperationForMysql = SchemaOperationForMysql;
