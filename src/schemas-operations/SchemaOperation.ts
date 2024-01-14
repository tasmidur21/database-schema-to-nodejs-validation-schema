export class SchemaOperation {
  private database: any;
  private schemaOperation:any;
  constructor(database: any,schemaOperation:any) {
    this.database = database;
    this.schemaOperation=schemaOperation;
  }
  async generate(): Promise<void> {
    try {
    await this.database.connect();
    const tableSchema = await this.schemaOperation.getTableSchema(this.database);
    console.log(tableSchema);
    const rules = this.schemaOperation.generateColumnRules(tableSchema);
    console.log(rules);
    } catch (error:any) {
      console.error('Validation error:', error.message);
    } finally {
      // Close the database connection
      this.database.end();
    }
  }
}
