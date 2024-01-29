//app/Validators/VineJsTestWithSelectedColumnRequestValidator.ts
import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VineJsTestWithSelectedColumnRequestValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
      
  })

  public messages: CustomMessages = {}
}
