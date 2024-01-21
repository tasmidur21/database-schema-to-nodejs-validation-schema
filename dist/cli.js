#!/usr/bin/env ts-node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const executor_1 = require("./executor");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
commander_1.program
    .version('1.0.0')
    .description('A simple CLI created with Commander in TypeScript');
commander_1.program
    .command('make:schema')
    .option('-db, --database <database>', 'Specify the database type as like mysql,postgres,sqlite')
    .option('-c, --columns <columns>', 'Specify the column name of the table')
    .requiredOption('-t, --table <table>', 'Specify the table name')
    .description('Dynamic schema generate')
    .action((cmd) => {
    var _a, _b;
    const tableName = cmd.table;
    const databaseType = (_a = cmd === null || cmd === void 0 ? void 0 : cmd.database) !== null && _a !== void 0 ? _a : null;
    const columns = (_b = cmd === null || cmd === void 0 ? void 0 : cmd.columns) !== null && _b !== void 0 ? _b : '';
    const options = {
        columns: columns.split(',').filter(Boolean),
    };
    new executor_1.Executor(tableName, databaseType, options).execute();
});
commander_1.program.parse(process.argv);
