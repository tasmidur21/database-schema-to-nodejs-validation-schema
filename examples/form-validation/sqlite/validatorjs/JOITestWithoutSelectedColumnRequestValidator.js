import * as Joi from 'joi';

class JOITestWithoutSelectedColumnRequestValidator {
    constructor(formData) {
        this.formData = formData;
    }

    validate() {
        const rules = Joi.object({
            varchar_column: Joi.string().required(),
float_column: Joi.number().required(),
boolean_column: Joi.required(),
date_column: Joi.date().required(),
timestamp_column: Joi.required(),
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