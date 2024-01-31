#!/usr/bin/env ts-node
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
const commander_1 = require("commander");
const executor_1 = require("./executor");
const dotenv_1 = require("dotenv");
const constants_1 = require("./utils/constants");
const utils_1 = require("./utils/utils");
// Load environment variables from a .env file if present
(0, dotenv_1.config)();
// Define the CLI program
commander_1.program
    .version('1.0.0')
    .description('A simple CLI app for dynamic schema rules generation');
commander_1.program
    .command("init")
    .action(() => {
    (0, utils_1.initSchema)();
});
// Define the 'make-rules' command
commander_1.program
    .command('make-rules')
    .addOption(new commander_1.Option('-db, --database <database>', 'Specify the database').choices([constants_1.DATABASE_MYSQL, constants_1.DATABASE_POSTGRES, constants_1.DATABASE_SQLITE]))
    .option('-c, --columns <columns>', 'Specify the column name of the table')
    .addOption(new commander_1.Option('-st, --schema-type [schema-type]', 'Specify the type of schema to generate (default is "joi")').choices([constants_1.REQUEST_VALIDATION_TYPE_JOI, constants_1.REQUEST_VALIDATION_TYPE_VALIDATORJS, constants_1.REQUEST_VALIDATION_TYPE_VINE]).default(constants_1.REQUEST_VALIDATION_TYPE_JOI))
    .requiredOption('-t, --table <table>', 'Specify the table name')
    .action((cmd) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /** TODO:
         * .addOption(new Option('-rv, --request-validation [request-validation]', 'The request validation file type').choices([REQUEST_VALIDATION_TYPE_JOI, REQUEST_VALIDATION_TYPE_VALIDATORJS, REQUEST_VALIDATION_TYPE_VINE]))
           .option('-f, --request-file <request-file>', 'Specify the request validator file name')
         */
        const { table, database, columns = "", schemaType } = cmd;
        // Parse the options
        const options = {
            columns: columns.split(',').filter(Boolean),
            validationSchemaType: schemaType,
            requestFile: null,
        };
        // Execute the main logic
        yield new executor_1.Executor(table, database, options).execute();
    }
    catch (error) {
        console.error(error.message);
    }
    finally {
        process.exit();
    }
}));
// Generate and print documentation for the options
commander_1.program.on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('$ nodeSchema make-rules -t my_table -db mysql -c column1,column2 -st joi');
});
// Parse the command line arguments
commander_1.program.parse(process.argv);
