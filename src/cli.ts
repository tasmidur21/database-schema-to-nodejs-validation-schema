#!/usr/bin/env ts-node
import { Option, program } from 'commander'
import { Executor } from './executor'
import { config as dotenvConfig } from 'dotenv'
import { DATABASE_MYSQL, DATABASE_POSTGRES, DATABASE_SQLITE, REQUEST_VALIDATION_TYPE_ADONIS, REQUEST_VALIDATION_TYPE_JOI, REQUEST_VALIDATION_TYPE_VALIDATORJS } from './utils/constants'
dotenvConfig()

program
  .version('1.0.0')
  .description('A simple CLI app for dynamic schema rules generation')
program
  .command('schema:make-rules')
  .addOption(new Option('-db, --database <database>', 'Specify the database').choices([DATABASE_MYSQL,DATABASE_POSTGRES,DATABASE_SQLITE]))
  .option('-c, --columns <columns>', 'Specify the column name of the table')
  .addOption(new Option('-crf, --create-request-for [create-request-for]', 'The request validation file type').choices([REQUEST_VALIDATION_TYPE_JOI,REQUEST_VALIDATION_TYPE_VALIDATORJS,REQUEST_VALIDATION_TYPE_ADONIS]))
  .option('-rf, --request-file <request-file>', 'Specify the request validator file name')
  .requiredOption('-t, --table <table>', 'Specify the table name')
  .action((cmd) => {
    const{table,database,columns="",createRequest,requestFile}=cmd;
    const options = {
      columns: columns.split(',').filter(Boolean),
      createRequest,
      requestFile
    } 
    new Executor(table, database, options).execute()
  })

program.parse(process.argv)
