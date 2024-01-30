import vine from '@vinejs/vine'

export default class Vine2RequestValidator {
  
  public schema = vine.object({
         created_at: vine.date().optional(),
  })

  public messages: CustomMessages = {}
}
