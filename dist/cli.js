#!/usr/bin/env ts-node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const executor_1 = require("./executor");
const dotenv_1 = require("dotenv");
const constants_1 = require("./utils/constants");
(0, dotenv_1.config)();
commander_1.program
    .version('1.0.0')
    .description('A simple CLI app for dynamic schema rules generation');
commander_1.program
    .command('schema:make-rules')
    .addOption(new commander_1.Option('-db, --database <database>', 'Specify the database').choices([constants_1.DATABASE_MYSQL, constants_1.DATABASE_POSTGRES, constants_1.DATABASE_SQLITE]))
    .option('-c, --columns <columns>', 'Specify the column name of the table')
    .addOption(new commander_1.Option('-rv, --request-validation [request-validation]', 'The request validation file type').choices([constants_1.REQUEST_VALIDATION_TYPE_JOI, constants_1.REQUEST_VALIDATION_TYPE_VALIDATORJS, constants_1.REQUEST_VALIDATION_TYPE_VINE]))
    .option('-rf, --request-file <request-file>', 'Specify the request validator file name')
    .requiredOption('-t, --table <table>', 'Specify the table name')
    .action((cmd) => {
    const { table, database, columns = "", requestValidation, requestFile } = cmd;
    const options = {
        columns: columns.split(',').filter(Boolean),
        validationSchemaType: requestValidation,
        requestFile
    };
    new executor_1.Executor(table, database, options).execute();
    //process.exit()
});
commander_1.program.parse(process.argv);
