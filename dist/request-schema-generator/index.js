"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestSchemaGenerator = void 0;
const RequestSchemaClassMap_1 = require("../contacts/RequestSchemaClassMap");
class RequestSchemaGenerator {
    constructor(templateSettings) {
        this.templateType = templateSettings.templateType;
        this.templateSettings = templateSettings;
        this.initializeRequestSchemaGenerator(this.templateType, this.templateSettings).buildAndStore();
    }
    // Function to initialize a class based on the request validation type
    initializeRequestSchemaGenerator(validationType, templateSetting) {
        const RequestSchemaGeneratorClass = RequestSchemaClassMap_1.requestSchemaClassMap[validationType];
        console.log(RequestSchemaGeneratorClass);
        if (RequestSchemaGeneratorClass) {
            return new RequestSchemaGeneratorClass(templateSetting);
        }
        else {
            throw new Error(`Unsupported request validation type: ${validationType}`);
        }
    }
}
exports.RequestSchemaGenerator = RequestSchemaGenerator;
