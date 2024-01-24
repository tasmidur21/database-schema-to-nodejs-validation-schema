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
const constants_1 = require("./utils/constants");
const request_schema_generator_1 = require("./request-schema-generator");
const messages_1 = require("./utils/messages");
class Executor {
    constructor(table, databaseType, options) {
        var _a, _b, _c;
        this.skipColumns = [];
        this.selectedColumns = [];
        this.table = table;
        this.databaseType = databaseType !== null && databaseType !== void 0 ? databaseType : config_1.config.defaultDatabase;
        this.databaseConfig = config_1.config.databases[this.databaseType];
        let skipColumns = (_a = config_1.config === null || config_1.config === void 0 ? void 0 : config_1.config.skipColumns) !== null && _a !== void 0 ? _a : [];
        this.options = options;
        if (this.options &&
            ((_b = this.options) === null || _b === void 0 ? void 0 : _b.columns) &&
            this.options.columns.length > 0) {
            this.selectedColumns = (_c = this.options) === null || _c === void 0 ? void 0 : _c.columns;
            this.skipColumns = skipColumns.filter((skipColumn) => { var _a; return !((_a = this.options) === null || _a === void 0 ? void 0 : _a.columns.includes(skipColumn)); });
        }
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const columnRules = yield this.initializeSchemaOperation().generateColumnRules();
                const templateSetting = {
                    fileName: this.table,
                    rules: columnRules,
                    templateType: constants_1.REQUEST_VALIDATION_TYPE_JOI,
                    stroreDir: 'request-validators',
                };
                const rules = new request_schema_generator_1.RequestSchemaGenerator(templateSetting).initializeRequestSchemaGenerator();
                console.log('\n');
                console.log(`🚀 Schema Base Validation rules for "${this.table}" table generated! 🚀`);
                console.log(`Copy and paste these rules into your validation location, such as controller, form request, or any applicable place 😊`);
                console.log('______________________________________________________________________________________________________________________');
                console.log('\n');
                console.log((0, messages_1.successMessage)(rules));
                console.log('\n');
            }
            catch (error) {
                console.error(error.message);
            }
            finally {
                // Close the database connection
                process.exit();
            }
        });
    }
    // Function to initialize a class based on the request validation type
    initializeSchemaOperation() {
        const SchemaOperationClass = constants_1.schemaOperationClass[this.databaseType];
        if (SchemaOperationClass) {
            return new SchemaOperationClass(this.table, this.databaseConfig, this.selectedColumns, this.skipColumns);
        }
        else {
            throw new Error(`Unsupported request validation type: ${this.databaseType}`);
        }
    }
}
exports.Executor = Executor;
