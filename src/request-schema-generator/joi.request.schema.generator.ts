import { templateSetting } from '../contacts/TemplateSetting'
import * as fs from 'fs'
import * as Handlebars from 'handlebars'
import * as path from 'path'
import { IRequestSchemaGenerator } from '../contacts/RequestSchemaGenerator'
import {
  buildTemplateContent,
  getClassName,
  snakeToCamel,
  storeFile,
} from '../utils/utils'
import { log } from 'console'

const CLASS_NAME_SUFFIX = `{{className}}RequestValidator`
const basePath = `validators`
const templateSource = fs.readFileSync(
  path.resolve(__dirname, '../templates/joi.template.hbs'),
  'utf8',
)

export class JoiRequestSchemaGenerator implements IRequestSchemaGenerator {
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
      CLASS_NAME_SUFFIX,
    )
  }
  public buildAndStore(): any {
    const content = buildTemplateContent(templateSource, {
      CLASS_NAME: this.className,
      RULES: this.parse(this.templateSetting.rules),
    })
    return storeFile(content, this.className, this.storeDir)
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
        return `${key}:Joi${concatedRules},`
      })
      .join('\n')
  }
}
