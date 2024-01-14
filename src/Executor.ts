import { log } from "console";
import { config } from "./config/config";
import { Database } from "./contacts/Database";
import { MySQLDatabase } from "./databases/MySQLDatabase";
import { PostgresDatabase } from "./databases/PostgresDatabase";
import { SqliteDatabase } from "./databases/SqliteDatabase";
import { SchemaOperation } from "./schemas-operations/SchemaOperation";
import { SchemaOperationForMysql } from "./schemas-operations/SchemaOperationForMysql";
import { SchemaOperationForPostgres } from "./schemas-operations/SchemaOperationForPostgres";
import { SchemaOperationForSqlite } from "./schemas-operations/SchemaOperationForSqlite";


export class Executor {
  private table: string;
  private databaseType: string;
  private databaseConfig: any;
  private options:any;

  constructor(table: string, databaseType?: string, options?: any) {
    this.table = table;
    this.databaseType = databaseType ?? config.default;
    this.databaseConfig = config[this.databaseType];
    this.options=options;
  }

  public async execute(): Promise<void> {
    console.log(this.databaseConfig);

    let database: Database;
    let operation: any;

    if (this.databaseType === 'postgres') {
      database = new PostgresDatabase(this.databaseConfig);
      operation=new SchemaOperationForPostgres();
    } else if (this.databaseType === 'mysql') {
      database = new MySQLDatabase(this.databaseConfig);
      operation=new SchemaOperationForMysql();
    } else if (this.databaseType === 'mysql') {
      database = new SqliteDatabase(this.databaseConfig);
      operation=new SchemaOperationForSqlite();
    }
    else {
      console.error('Invalid database type. Please use "postgres" or "mysql".');
      return;
    }
    try {
      await database.connect();
      let tableSchema = await operation.getTableSchema(database,this.table);
      if(this.options&&this.options?.columns&&this.options.columns.length>0){
        tableSchema=tableSchema.filter(({column_name}:any)=>this.options.columns.includes(column_name));
      }
      console.log(tableSchema);
      const rules = operation.generateColumnRules(tableSchema);
      console.log(rules);
      } catch (error:any) {
        console.error('Validation error:', error.message);
      } finally {
        // Close the database connection
         database.end();
      }
  }
}

