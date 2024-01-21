import {
  RequestSchemaClassMap,
  requestSchemaClassMap,
} from "../contacts/RequestSchemaClassMap";
import { templateSetting } from "../contacts/TemplateSetting";

export class RequestSchemaGenerator {
  private templateType: (keyof RequestSchemaClassMap);
  private templateSettings: templateSetting;
 
  constructor(templateSettings: templateSetting) {
    this.templateType = templateSettings.templateType;
    this.templateSettings = templateSettings;
    this.initializeRequestSchemaGenerator(
      this.templateType,
      this.templateSettings
    ).buildAndStore();
  }

  // Function to initialize a class based on the request validation type
  private initializeRequestSchemaGenerator(
    validationType: keyof RequestSchemaClassMap,
    templateSetting: templateSetting
  ): InstanceType<RequestSchemaClassMap[keyof RequestSchemaClassMap]> {
    const RequestSchemaGeneratorClass = requestSchemaClassMap[validationType];
      console.log(RequestSchemaGeneratorClass);
    if (RequestSchemaGeneratorClass) {
      return new RequestSchemaGeneratorClass(templateSetting)
    } else {
      throw new Error(`Unsupported request validation type: ${validationType}`);
    }
  }
}
