//app/Validators/CustomerRequestValidator.ts
import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CustomerRequestValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
      FirstName:schema.string().max(40).optional(),
LastName:schema.string().max(20).optional(),
Company:schema.string().max(80).required(),
Address:schema.string().max(70).required(),
City:schema.string().max(40).required(),
State:schema.string().max(40).required(),
Country:schema.string().max(40).required(),
PostalCode:schema.string().max(10).required(),
Phone:schema.string().max(24).required(),
Fax:schema.string().max(24).required(),
Email:schema.string().max(60).optional(),
SupportRepId:schema.integer().min(-9223372036854775808).max(9223372036854775807).required(),
  })

  public messages: CustomMessages = {}
}
