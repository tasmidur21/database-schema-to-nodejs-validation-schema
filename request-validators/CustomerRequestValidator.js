import * as Joi from 'joi';

class CustomerRequestValidator {
    constructor(formData) {
        this.formData = formData;
    }

    validate() {
        const rules = Joi.object({
            FirstName: Joi.string().max(40).optional(),
LastName: Joi.string().max(20).optional(),
Company: Joi.string().max(80).required(),
Address: Joi.string().max(70).required(),
City: Joi.string().max(40).required(),
State: Joi.string().max(40).required(),
Country: Joi.string().max(40).required(),
PostalCode: Joi.string().max(10).required(),
Phone: Joi.string().max(24).required(),
Fax: Joi.string().max(24).required(),
Email: Joi.string().max(60).optional(),
SupportRepId: Joi.integer().min(-9223372036854775808).max(9223372036854775807).required(),
            });

        const validation = rules.validate(this.formData);

        if (validation.error) {
           console.error(validationResult.error.message);
        } else {
            console.log('Validation successful');
        }
    }
}
module.exports = CustomerRequestValidator;