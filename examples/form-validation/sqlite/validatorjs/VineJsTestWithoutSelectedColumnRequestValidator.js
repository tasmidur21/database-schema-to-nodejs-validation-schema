//app/Validators/VineJsTestWithoutSelectedColumnRequestValidator.ts
import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VineJsTestWithoutSelectedColumnRequestValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
         varchar_column: vine.string().any(),
   float_column: vine.number().any(),
   boolean_column: vine.any(),
   date_column: vine.date().any(),
   timestamp_column: vine.any(),
  })

  public messages: CustomMessages = {}
}
