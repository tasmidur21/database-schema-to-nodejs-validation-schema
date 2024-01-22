import { AdonisRequestSchemaGenerator } from '../request-schema-generator/adnonis.request.schema.generator'
import { JoiRequestSchemaGenerator } from '../request-schema-generator/joi.request.schema.generator'
import { ValidatorJsRequestSchemaGenerator } from '../request-schema-generator/validatorjs.request.schema.generator'
import {
  REQUEST_VALIDATION_TYPE_ADONIS,
  REQUEST_VALIDATION_TYPE_JOI,
  REQUEST_VALIDATION_TYPE_VALIDATORJS,
} from '../utils/constants'

export interface RequestSchemaClassMap {
  [REQUEST_VALIDATION_TYPE_ADONIS]: typeof AdonisRequestSchemaGenerator
  [REQUEST_VALIDATION_TYPE_JOI]: typeof JoiRequestSchemaGenerator
  [REQUEST_VALIDATION_TYPE_VALIDATORJS]: typeof ValidatorJsRequestSchemaGenerator
}

export const requestSchemaClassMap: RequestSchemaClassMap = {
  [REQUEST_VALIDATION_TYPE_ADONIS]: AdonisRequestSchemaGenerator,
  [REQUEST_VALIDATION_TYPE_JOI]: JoiRequestSchemaGenerator,
  [REQUEST_VALIDATION_TYPE_VALIDATORJS]: ValidatorJsRequestSchemaGenerator,
}
