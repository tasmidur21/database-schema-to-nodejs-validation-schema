import * as Validator from 'validatorjs';


class MysqlDataTypes {
    constructor(formData) {
        this.formData = formData;
    }

    validate() {
        const rules = {
            uuid_column: ['required,string,max:36'],
            int_column: ['nullable,integer,min:-2147483648,max:2147483647'],
            unsigned_int_column: ['nullable,integer,min:0,max:4294967295'],
            tinyint_column: ['nullable,integer,min:-128,max:127'],
            smallint_column: ['nullable,integer,min:-32768,max:32767'],
            mediumint_column: ['nullable,integer,min:-8388608,max:8388607'],
            bigint_column: ['nullable,integer,min:-9223372036854775808,max:9223372036854775807'],
            float_column: ['nullable,numeric'],
            double_column: ['nullable,numeric'],
            decimal_column: ['nullable,numeric'],
            date_column: ['nullable,date'],
            time_column: ['nullable,date'],
            datetime_column: ['nullable'],
            timestamp_column: ['nullable,date,after_or_equal:1970-01-01 00:00:01,before_or_equal:2038-01-19 03:14:07'],
            char_column: ['nullable,string,max:10'],
            varchar_column: ['nullable,string,max:255'],
            text_column: ['nullable,string'],
            enum_column: ['nullable,string,in:value1,value2,value3'],
            binary_column: ['nullable'],
            varbinary_column: ['nullable'],
            blob_column: ['nullable'],
            bit_column: ['nullable'],
            geometry_column: ['nullable'],
            point_column: ['nullable,integer,min:-2147483648,max:2147483647'],
            json_column: ['nullable,json'],
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
module.exports = MysqlDataTypes;
