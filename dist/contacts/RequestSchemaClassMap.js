"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestSchemaClassMap = void 0;
const adnonis_request_schema_generator_1 = require("../request-schema-generator/adnonis.request.schema.generator");
const joi_request_schema_generator_1 = require("../request-schema-generator/joi.request.schema.generator");
const validatorjs_request_schema_generator_1 = require("../request-schema-generator/validatorjs.request.schema.generator");
const constants_1 = require("../utils/constants");
exports.requestSchemaClassMap = {
    [constants_1.REQUEST_VALIDATION_TYPE_ADONIS]: adnonis_request_schema_generator_1.AdonisRequestSchemaGenerator,
    [constants_1.REQUEST_VALIDATION_TYPE_JOI]: joi_request_schema_generator_1.JoiRequestSchemaGenerator,
    [constants_1.REQUEST_VALIDATION_TYPE_VALIDATORJS]: validatorjs_request_schema_generator_1.ValidatorJsRequestSchemaGenerator,
};
