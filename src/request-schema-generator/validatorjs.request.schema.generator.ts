import { templateSetting } from '../contacts/TemplateSetting'
import * as fs from 'fs'
import * as Handlebars from 'handlebars'
import * as path from 'path'
import { IRequestSchemaGenerator } from '../contacts/RequestSchemaGenerator'
import { buildTemplateContent, getClassName, snakeToCamel, storeFile } from '../utils/utils'

const CLASS_NAME_SUFFIX = `{{className}}RequestValidator`
const basePath = `validators`
const templateSource = fs.readFileSync(
  path.resolve(__dirname, '../templates/validatorjs.template'),
  'utf8',
)

export class ValidatorJsRequestSchemaGenerator
  implements IRequestSchemaGenerator
{
  private templateSetting: templateSetting
  private className: string
  private storeDir: string
  constructor(templateSetting: templateSetting) {
    this.templateSetting = templateSetting
    this.storeDir = templateSetting?.stroreDir ?? basePath
    this.className = getClassName(
      {
        className: snakeToCamel(this.templateSetting.fileName),
      },
      CLASS_NAME_SUFFIX
    )
  }
  public buildAndStore(): any {
    const content = buildTemplateContent(templateSource, {
        CLASS_NAME: this.className,
        RULES:JSON.stringify(this.templateSetting.rules,null,2),
      })
    return storeFile(content, this.className, this.storeDir)
  }
  private parse(rules:any){
      return Object.keys(rules).map((key:string)=>{
        return `${key}:[${rules[key]}]`;
      }).join(',\n')
  }

}
