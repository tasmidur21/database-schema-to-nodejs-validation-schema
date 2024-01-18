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
exports.Executor = void 0;
const config_1 = require("./config/config");
const MySQLDatabase_1 = require("./databases/MySQLDatabase");
const PostgresDatabase_1 = require("./databases/PostgresDatabase");
const SqliteDatabase_1 = require("./databases/SqliteDatabase");
const SchemaOperationForMysql_1 = require("./schemas-operations/SchemaOperationForMysql");
const SchemaOperationForPostgres_1 = require("./schemas-operations/SchemaOperationForPostgres");
const SchemaOperationForSqlite_1 = require("./schemas-operations/SchemaOperationForSqlite");
const messages_1 = require("./utils/messages");
class Executor {
    constructor(table, databaseType, options) {
        var _a;
        this.table = table;
        this.databaseType = databaseType !== null && databaseType !== void 0 ? databaseType : config_1.config.defaultDatabase;
        this.databaseConfig = config_1.config.databases[this.databaseType];
        this.skipColumns = (_a = config_1.config === null || config_1.config === void 0 ? void 0 : config_1.config.skipColumns) !== null && _a !== void 0 ? _a : [];
        this.options = options;
    }
    execute() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let database;
            let operation;
            if (this.databaseType === 'postgres') {
                database = new PostgresDatabase_1.PostgresDatabase(this.databaseConfig);
                operation = new SchemaOperationForPostgres_1.SchemaOperationForPostgres();
            }
            else if (this.databaseType === 'mysql') {
                database = new MySQLDatabase_1.MySQLDatabase(this.databaseConfig);
                operation = new SchemaOperationForMysql_1.SchemaOperationForMysql();
            }
            else if (this.databaseType === 'sqlite') {
                database = new SqliteDatabase_1.SqliteDatabase(this.databaseConfig);
                operation = new SchemaOperationForSqlite_1.SchemaOperationForSqlite();
            }
            else {
                console.error((0, messages_1.errorMessage)('Invalid database type. Please use "postgres","mysql" and sqlite.'));
                return;
            }
            try {
                yield database.connect();
                let tableSchema = yield operation.getTableSchema(database, this.table);
                let skipColumns = [];
                let selectedColumns = [];
                if (this.options && ((_a = this.options) === null || _a === void 0 ? void 0 : _a.columns) && this.options.columns.length > 0) {
                    selectedColumns = (_b = this.options) === null || _b === void 0 ? void 0 : _b.columns;
                    skipColumns = this.skipColumns.filter((skipColumn) => { var _a; return !((_a = this.options) === null || _a === void 0 ? void 0 : _a.columns.includes(skipColumn)); });
                }
                const rules = operation.generateColumnRules(tableSchema, selectedColumns, skipColumns);
                // generateValidator(this.table,rules);
                console.log("\n");
                console.log(`🚀 Validation rules for "${this.table}" table generated! 🚀`);
                console.log(`Copy and paste these rules into your validation location, such as controller, form request, or any applicable place 😊`);
                console.log("______________________________________________________________________________________________________________________");
                console.log("\n");
                console.log(rules);
                console.log("\n");
            }
            catch (error) {
                console.error(error.message);
            }
            finally {
                // Close the database connection
                database.end();
                process.exit();
            }
        });
    }
}
exports.Executor = Executor;
