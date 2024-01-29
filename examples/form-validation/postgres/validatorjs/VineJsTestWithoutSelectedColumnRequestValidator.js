//app/Validators/VineJsTestWithoutSelectedColumnRequestValidator.ts
import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VineJsTestWithoutSelectedColumnRequestValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
         varchar_column: vine.string().maxLength(255).optional(),
   char_column: vine.string().maxLength(10).optional(),
   int_column: vine.integer().enum([-2147483648]).maxLength(2147483647).optional(),
   bigint_column: vine.integer().enum([-2147483648]).maxLength(2147483647).optional(),
   decimal_column: vine.number().optional(),
   float_column: vine.number().optional(),
   double_column: vine.number().optional(),
   date_column: vine.date().optional(),
   timestamp_column: vine.date().optional(),
   boolean_column: vine.boolean().optional(),
   text_column: vine.string().optional(),
   blob_column: vine.optional(),
   json_column: vine.any().optional(),
  })

  public messages: CustomMessages = {}
}
