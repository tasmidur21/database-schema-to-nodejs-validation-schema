//app/Validators/VineJsTestWithSelectedColumnRequestValidator.ts
import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VineJsTestWithSelectedColumnRequestValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
         varchar_column: vine.string().maxLength(255).optional(),
   int_column: vine.integer().enum([-2147483648]).maxLength(2147483647).optional(),
   float_column: vine.number().optional(),
   date_column: vine.date().optional(),
  })

  public messages: CustomMessages = {}
}
