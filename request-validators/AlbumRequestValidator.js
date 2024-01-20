import * as Validator from 'validatorjs';

class AlbumRequestValidator {
    constructor(formData) {
        this.formData = formData;
    }

    validate() {
         const rules = {
            Title: ['nullable,string,max:160'],
            ArtistId: ['nullable,integer,min:-9223372036854775808,max:9223372036854775807'],
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
module.exports = AlbumRequestValidator;