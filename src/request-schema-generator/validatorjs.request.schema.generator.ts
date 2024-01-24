import { ITemplateSetting } from '../contacts/TemplateSetting'
import * as fs from 'fs'
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
  private templateSetting: ITemplateSetting
  private className: string
  private storeDir: string
  constructor(templateSetting: ITemplateSetting) {
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
    const pasedRules=JSON.stringify(this.templateSetting.rules,null,2);
    const content = buildTemplateContent(templateSource, {
        CLASS_NAME: this.className,
        RULES:pasedRules,
      })
    storeFile(content, this.className, this.storeDir)
    return pasedRules;
  }
}
