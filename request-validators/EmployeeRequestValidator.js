const Joi = require('joi');

class EmployeeRequestValidator {
    constructor(formData) {
        this.formData = formData;
    }

    validate() {
        const rules = Joi.object({
            LastName: Joi.string().max(10).optional(),
            FirstName: Joi.string().max(10).optional(),
            Title: Joi.string().max(10).required(),
            ReportsTo: Joi.integer().min(1).max(10).required(),
            BirthDate: Joi.date().required(),
            HireDate: Joi.date().required(),
            Address: Joi.string().max(10).required(),
            City: Joi.string().max(10).required(),
            State: Joi.string().max(10).required(),
            Country: Joi.string().max(10).required(),
            PostalCode: Joi.string().max(10).required(),
            Phone: Joi.string().max(10).required(),
            Fax: Joi.string().max(10).required(),
            Email: Joi.string().max(10).required(),
        });

        const validation = rules.validate(this.formData);

        if (validation.error) {
            console.error(validationResult.error.message);
        } else {
            console.log('Validation successful');
        }
    }
}
module.exports = EmployeeRequestValidator;