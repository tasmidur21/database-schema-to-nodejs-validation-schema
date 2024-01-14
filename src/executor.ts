import { error } from "console";
import { config } from "./config/config";
import { Database } from "./contacts/Database";
import { MySQLDatabase } from "./databases/MySQLDatabase";
import { PostgresDatabase } from "./databases/PostgresDatabase";
import { SqliteDatabase } from "./databases/SqliteDatabase";
import { SchemaOperationForMysql } from "./schemas-operations/SchemaOperationForMysql";
import { SchemaOperationForPostgres } from "./schemas-operations/SchemaOperationForPostgres";
import { SchemaOperationForSqlite } from "./schemas-operations/SchemaOperationForSqlite";
import { errorMessage, successMessage } from "./config/messages";
import { generateValidator } from "./dynamicValidatorGenerator";

export class Executor {
  private table: string;
  private databaseType: string;
  private databaseConfig: any;
  private options:any;

  constructor(table: string, databaseType?: string, options?: any) {
    this.table = table;
    this.databaseType = databaseType ?? config.database_type;
    this.databaseConfig = config.database;
    this.options=options;
  }

  public async execute(): Promise<void> {
    let database: Database;
    let operation: any;

    if (this.databaseType === 'postgres') {
      database = new PostgresDatabase(this.databaseConfig);
      operation=new SchemaOperationForPostgres();
    } else if (this.databaseType === 'mysql') {
      database = new MySQLDatabase(this.databaseConfig);
      operation=new SchemaOperationForMysql();
    } else if (this.databaseType === 'sqlite') {
      database = new SqliteDatabase(this.databaseConfig);
      operation=new SchemaOperationForSqlite();
    }
    else {
      console.error(errorMessage('Invalid database type. Please use "postgres","mysql" and sqlite.'));
      return;
    }
    try {
      await database.connect();
      let tableSchema = await operation.getTableSchema(database,this.table);
      if(this.options&&this.options?.columns&&this.options.columns.length>0){
        tableSchema=tableSchema.filter(({column_name}:any)=>this.options.columns.includes(column_name));
      }
      const rules = operation.generateColumnRules(tableSchema);
      //generateValidator(this.table,rules);
      console.log(`The validation schema of ${this.table}:\n`,rules);
      } catch (error:any) {
        console.error(error.message);
      } finally {
        // Close the database connection
         database.end();
         process.exit();
      }
  }
}

