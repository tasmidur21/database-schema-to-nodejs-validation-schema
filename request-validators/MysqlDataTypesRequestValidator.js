import * as Joi from 'joi';

class MysqlDataTypesRequestValidator {
    constructor(formData) {
        this.formData = formData;
    }

    validate() {
        const rules = Joi.object({});

        const validation = rules.validate(this.formData);

        if (validation.error) {
           console.error(validationResult.error.message);
        } else {
            console.log('Validation successful');
        }
    }
}
module.exports = MysqlDataTypesRequestValidator;