import * as Joi from 'joi';

export class Validation {
  static validateData(data: any, schema: any): void {
    const validation = Joi.object(schema).validate(data);
    if (validation.error) {
      throw new Error(validation.error.details[0].message);
    }
  }
}
