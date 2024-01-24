import { ITemplateSetting } from '../contacts/TemplateSetting'
import * as fs from 'fs'
import * as path from 'path'
import { IRequestSchemaGenerator } from '../contacts/RequestSchemaGenerator'
import {
    buildTemplateContent,
    getClassName,
    snakeToCamel,
    storeFile,
} from '../utils/utils'

const CLASS_NAME_SUFFIX = `{{className}}RequestValidator`
const basePath = `validators`
const templateSource = fs.readFileSync(
  path.resolve(__dirname, '../templates/adonis.template'),
  'utf8',
)

export class AdonisRequestSchemaGenerator implements IRequestSchemaGenerator {
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
    const pasedRules=this.parse(this.templateSetting.rules)
    const content = buildTemplateContent(templateSource, {
      CLASS_NAME: this.className,
      RULES: pasedRules
    })
    storeFile(content, this.className, this.storeDir,"ts");
    return pasedRules;
  }

  private parse = (rules: any) => {
    return Object.keys(rules)
      .map((key: string) => {
        const schemaRules = (this.templateSetting.rules as any)[key]
        let concatedRules = schemaRules
          .map((_item: any) => {
            let rule = ``
            switch (true) {
              case _item === 'string':
                rule = '.string()'
                break
              case _item.includes('integer'):
                rule = '.integer()'
                break
              case _item.includes('numeric'):
                rule = '.number()'
                break
              case _item.includes('date'):
                rule = '.date()'
                break
              case _item.includes('bool'):
                rule = '.boolean()'
                break
              case _item.includes('max'): {
                const value = _item.split(':')[1] ?? 1
                rule = `.max(${value})`
                break
              }
              case _item.includes('min'): {
                const value = _item.split(':')[1] ?? 1
                rule = `.min(${value})`
                break
              }
              case _item.includes('required'):
                rule = '.required()'
                break
              case _item.includes('nullable'):
                rule = '.optional()'
                break
              default:
                break
            }
            return rule
          })
          .join('')
        return `   ${key}: schema${concatedRules},`
      })
      .join('\n')
  }
}
