import * as Validator from 'validatorjs';

class  ValidatorJSTestWithoutSelectedColumnRequestValidator {
    constructor(formData) {
        this.formData = formData;
    }

    validate() {
         const rules =  {
  "varchar_column": [
    "string",
    "required"
  ],
  "float_column": [
    "numeric",
    "required"
  ],
  "boolean_column": [
    "required"
  ],
  "date_column": [
    "date",
    "required"
  ],
  "timestamp_column": [
    "required"
  ]
};
         

        const validation = new Validator(this.formData, rules);

        if (validation.fails()) {
            const errors = validation.errors.all();
            console.log('Validation failed:', errors);
        } else {
            console.log('Validation passed!');
        }
    }
}
module.exports =  ValidatorJSTestWithoutSelectedColumnRequestValidator;