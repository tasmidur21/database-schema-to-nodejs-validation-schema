//app/Validators/MysqlDataTypesRequestValidator.ts
import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MysqlDataTypesRequestValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
      uuid_column:schema.string().max(36).required(),
int_column:schema.integer().min(-2147483648).max(2147483647).optional(),
unsigned_int_column:schema.integer().min(0).max(4294967295).optional(),
tinyint_column:schema.integer().min(-128).max(127).optional(),
smallint_column:schema.integer().min(-32768).max(32767).optional(),
mediumint_column:schema.integer().min(-8388608).max(8388607).optional(),
bigint_column:schema.integer().min(-9223372036854775808).max(9223372036854775807).optional(),
float_column:schema.number().optional(),
double_column:schema.number().optional(),
decimal_column:schema.number().optional(),
date_column:schema.date().optional(),
time_column:schema.date().optional(),
datetime_column:schema.optional(),
timestamp_column:schema.date().optional(),
char_column:schema.string().max(10).optional(),
varchar_column:schema.string().max(255).optional(),
text_column:schema.string().optional(),
enum_column:schema.string().optional(),
binary_column:schema.optional(),
varbinary_column:schema.optional(),
blob_column:schema.optional(),
bit_column:schema.optional(),
geometry_column:schema.optional(),
point_column:schema.integer().min(-2147483648).max(2147483647).optional(),
json_column:schema.optional(),
  })

  public messages: CustomMessages = {}
}
