#!/usr/bin/env ts-node

import { program } from 'commander';
import { Executor } from './Executor';
import { config as dotenvConfig } from 'dotenv';
import { Database } from './contacts/Database';
dotenvConfig();

program
  .version('1.0.0')
  .description('A simple CLI created with Commander in TypeScript');

program
  .command('schema:gen')
  .option('-db, --database <database>', 'Specify the database type as like mysql,postgres,sqlite')
  .option('-c, --columns <columns>', 'Specify the column name of the table')
  .requiredOption('-t, --table <table>', 'Specify the table name')
  .description('Dynamic schema generate')
  .action((cmd) => {
    const tableName=cmd.table;
    const databaseType=cmd?.database??null;
    const columns=cmd?.columns??"";
    const options={
      columns:columns.split(",").filter(Boolean)
    }
    new Executor(tableName,databaseType,options).execute();
  });
program.parse(process.argv);
