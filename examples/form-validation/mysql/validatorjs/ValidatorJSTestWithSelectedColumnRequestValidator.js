import * as Validator from 'validatorjs';

class  ValidatorJSTestWithSelectedColumnRequestValidator {
    constructor(formData) {
        this.formData = formData;
    }

    validate() {
         const rules =  {
  "varchar_column": [
    "string",
    "max:255",
    "nullable"
  ],
  "int_column": [
    "integer",
    "min:-2147483648",
    "max:2147483647",
    "nullable"
  ],
  "float_column": [
    "numeric",
    "nullable"
  ],
  "date_column": [
    "date",
    "nullable"
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
module.exports =  ValidatorJSTestWithSelectedColumnRequestValidator;