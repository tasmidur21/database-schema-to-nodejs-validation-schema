import * as Validator from 'validatorjs';

class  ValidatorJSTestWithSelectedColumnRequestValidator {
    constructor(formData) {
        this.formData = formData;
    }

    validate() {
         const rules =  {};
         

        const validation = new Validator(this.formData, rules);

        if (validation.fails()) {
            const errors = validation.errors.all();
            console.log('Validation failed:', errors);
        } else {
            console.log('Validation passed!');
        }
    }
}
module.exports =  ValidatorJSTestWithSelectedColumnRequestValidator;