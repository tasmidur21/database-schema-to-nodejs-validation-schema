import * as Joi from 'joi';

class JOITestWithoutSelectedColumnRequestValidator {
    constructor(formData) {
        this.formData = formData;
    }

    validate() {
        const rules = Joi.object({
            varchar_column: Joi.string().max(255).optional(),
char_column: Joi.string().max(10).optional(),
int_column: Joi.integer().min(-2147483648).max(2147483647).optional(),
bigint_column: Joi.integer().min(-9223372036854775808).max(9223372036854775807).optional(),
decimal_column: Joi.number().optional(),
float_column: Joi.number().optional(),
double_column: Joi.number().optional(),
date_column: Joi.date().optional(),
timestamp_column: Joi.date().optional(),
boolean_column: Joi.boolean().optional(),
enum_column: Joi.string().optional(),
text_column: Joi.string().optional(),
blob_column: Joi.optional(),
json_column: Joi.optional(),
            });

        const validation = rules.validate(this.formData);

        if (validation.error) {
           console.error(validationResult.error.message);
        } else {
            console.log('Validation successful');
        }
    }
}
module.exports = JOITestWithoutSelectedColumnRequestValidator;