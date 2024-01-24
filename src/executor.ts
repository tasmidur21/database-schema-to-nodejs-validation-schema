import { config } from './config/config'
import {
  REQUEST_VALIDATION_TYPE_ADONIS,
  REQUEST_VALIDATION_TYPE_JOI,
  REQUEST_VALIDATION_TYPE_VALIDATORJS,
  schemaOperationClass,
} from './utils/constants'
import { RequestSchemaGenerator } from './request-schema-generator'
import { ITemplateSetting } from './contacts/TemplateSetting'
import { ISchemaOperationClassMap } from './contacts/SchemaOperationClassMap'
import { successMessage } from './utils/messages'

export class Executor {
  private table: string
  private databaseType: (keyof ISchemaOperationClassMap)
  private databaseConfig: any
  private options: any
  private skipColumns: string[]=[]
  private selectedColumns: string[]=[]
  
  constructor(table: string, databaseType?: string, options?: any) {
    this.table = table
    this.databaseType = databaseType ?? config.defaultDatabase
    this.databaseConfig = config.databases[this.databaseType]
    let skipColumns: string[] = config?.skipColumns ?? []
    this.options = options
      if (
        this.options &&
        this.options?.columns &&
        this.options.columns.length > 0
      ) {
        this.selectedColumns = this.options?.columns
        this.skipColumns = skipColumns.filter(
          (skipColumn) => !this.options?.columns.includes(skipColumn),
        )
      }
  }

  public async execute(): Promise<void> {
    try {
      const columnRules = await this.initializeSchemaOperation().generateColumnRules(); 
      const templateSetting: ITemplateSetting = {
        fileName: this.table,
        rules: columnRules,
        templateType: REQUEST_VALIDATION_TYPE_JOI,
        stroreDir: 'request-validators',
      }
      const rules=new RequestSchemaGenerator(templateSetting).initializeRequestSchemaGenerator();

      console.log('\n')
      console.log(
        `🚀 Schema Base Validation rules for "${this.table}" table generated! 🚀`,
      )
      console.log(
        `Copy and paste these rules into your validation location, such as controller, form request, or any applicable place 😊`,
      )
      console.log(
        '______________________________________________________________________________________________________________________',
      )
      console.log('\n')
      console.log(successMessage(rules))
      console.log('\n')
    } catch (error: any) {
      console.error(error.message)
    } finally {
      // Close the database connection
      process.exit()
    }
  }

  // Function to initialize a class based on the request validation type
  private initializeSchemaOperation(): InstanceType<ISchemaOperationClassMap[keyof ISchemaOperationClassMap]> {
    const SchemaOperationClass = schemaOperationClass[this.databaseType]
    if (SchemaOperationClass) { 
      return new SchemaOperationClass(this.table,this.databaseConfig,this.selectedColumns,this.skipColumns)
    } else {
      throw new Error(`Unsupported request validation type: ${this.databaseType}`)
    }
  }
}
