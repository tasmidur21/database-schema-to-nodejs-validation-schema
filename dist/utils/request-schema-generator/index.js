"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestSchemaGenerator = void 0;
const RequestSchemaClassMap_1 = require("../../contacts/RequestSchemaClassMap");
class RequestSchemaGenerator {
    constructor(templateSettings) {
        this.templateType = templateSettings.fileName;
        this.strorePath = templateSettings === null || templateSettings === void 0 ? void 0 : templateSettings.stroreDir;
        this.templateSettings = templateSettings;
        this.templateTypeInstance = this.initializeRequestSchemaGenerator(this.templateType, this.templateSettings);
    }
    /**
     * generate
     */
    generate() { }
    saveFile() { }
    // Function to initialize a class based on the request validation type
    initializeRequestSchemaGenerator(validationType, templateSetting) {
        const RequestSchemaGeneratorClass = RequestSchemaClassMap_1.requestSchemaClassMap[validationType];
        if (RequestSchemaGeneratorClass) {
            return new RequestSchemaGeneratorClass(templateSetting);
        }
        else {
            throw new Error(`Unsupported request validation type: ${validationType}`);
        }
    }
}
exports.RequestSchemaGenerator = RequestSchemaGenerator;
