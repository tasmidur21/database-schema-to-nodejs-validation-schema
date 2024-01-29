//app/Validators/VineJsTestWithSelectedColumnRequestValidator.ts
import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VineJsTestWithSelectedColumnRequestValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
         varchar_column: vine.string().any(),
   float_column: vine.number().any(),
   date_column: vine.date().any(),
  })

  public messages: CustomMessages = {}
}
