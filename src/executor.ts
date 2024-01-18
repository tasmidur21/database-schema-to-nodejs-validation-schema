
import { config } from "./config/config";
import { Database } from "./contacts/Database";
import { MySQLDatabase } from "./databases/MySQLDatabase";
import { PostgresDatabase } from "./databases/PostgresDatabase";
import { SqliteDatabase } from "./databases/SqliteDatabase";
import { SchemaOperationForMysql } from "./schemas-operations/SchemaOperationForMysql";
import { SchemaOperationForPostgres } from "./schemas-operations/SchemaOperationForPostgres";
import { SchemaOperationForSqlite } from "./schemas-operations/SchemaOperationForSqlite";
import { errorMessage, successMessage } from "./utils/messages";
import { generateValidator } from "./utils/dynamicValidatorGenerator";
import { arrayIntersection } from "./utils/manipulation";

export class Executor {
  private table: string;
  private databaseType: string;
  private databaseConfig: any;
  private options:any;
  private skipColumns:string[];

  constructor(table: string, databaseType?: string, options?: any) {
    this.table = table;
    this.databaseType = databaseType ?? config.defaultDatabase;
    this.databaseConfig = config.databases[this.databaseType];
    this.skipColumns=config?.skipColumns??[];
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
      let skipColumns:string[]= [];
      let selectedColumns:string[]=[];
      if(this.options&&this.options?.columns&&this.options.columns.length>0){
        selectedColumns=this.options?.columns;
        skipColumns=this.skipColumns.filter((skipColumn)=>!this.options?.columns.includes(skipColumn));
      }
      const rules = operation.generateColumnRules(tableSchema,selectedColumns,skipColumns);
     // generateValidator(this.table,rules);
      console.log("\n");
      console.log(`🚀 Validation rules for "${this.table}" table generated! 🚀`)
      console.log(`Copy and paste these rules into your validation location, such as controller, form request, or any applicable place 😊`)
      console.log("______________________________________________________________________________________________________________________");
      console.log("\n");
      console.log(rules);
      console.log("\n");
      } catch (error:any) {
        console.error(error.message);
      } finally {
        // Close the database connection
         database.end();
         process.exit();
      }
  }
}

