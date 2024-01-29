import * as Validator from 'validatorjs';

class  ValidatorJSTestWithoutSelectedColumnRequestValidator {
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
  "char_column": [
    "string",
    "max:10",
    "nullable"
  ],
  "int_column": [
    "integer",
    "min:-2147483648",
    "max:2147483647",
    "nullable"
  ],
  "bigint_column": [
    "integer",
    "min:-9223372036854775808",
    "max:9223372036854775807",
    "nullable"
  ],
  "decimal_column": [
    "numeric",
    "nullable"
  ],
  "float_column": [
    "numeric",
    "nullable"
  ],
  "double_column": [
    "numeric",
    "nullable"
  ],
  "date_column": [
    "date",
    "nullable"
  ],
  "timestamp_column": [
    "date",
    "after_or_equal:1970-01-01 00:00:01",
    "before_or_equal:2038-01-19 03:14:07",
    "nullable"
  ],
  "boolean_column": [
    "boolean",
    "nullable"
  ],
  "enum_column": [
    "string",
    "in:1,2,3",
    "nullable"
  ],
  "text_column": [
    "string",
    "nullable"
  ],
  "blob_column": [
    "nullable"
  ],
  "json_column": [
    "json",
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
module.exports =  ValidatorJSTestWithoutSelectedColumnRequestValidator;