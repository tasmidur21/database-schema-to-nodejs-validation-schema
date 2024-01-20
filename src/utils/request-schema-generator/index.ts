import {
  RequestSchemaClassMap,
  requestSchemaClassMap,
} from "../../contacts/RequestSchemaClassMap";
import { templateSetting } from "../../contacts/TemplateSetting";

export class RequestSchemaGenerator {
  private templateType: (keyof RequestSchemaClassMap);
  private templateSettings: templateSetting;
  private strorePath?:string;
  private templateTypeInstance:(InstanceType<RequestSchemaClassMap[keyof RequestSchemaClassMap]>);

  constructor(templateSettings: templateSetting) {
    this.templateType = templateSettings.fileName;
    this.strorePath=templateSettings?.stroreDir;
    this.templateSettings = templateSettings;
    this.templateTypeInstance = this.initializeRequestSchemaGenerator(
      this.templateType,
      this.templateSettings
    )
  }

  /**
   * generate
   */
  public generate() {}

  private saveFile() {}

  // Function to initialize a class based on the request validation type
  private initializeRequestSchemaGenerator(
    validationType: keyof RequestSchemaClassMap,
    templateSetting: templateSetting
  ): InstanceType<RequestSchemaClassMap[keyof RequestSchemaClassMap]> {
    const RequestSchemaGeneratorClass = requestSchemaClassMap[validationType];

    if (RequestSchemaGeneratorClass) {
      return new RequestSchemaGeneratorClass(templateSetting);
    } else {
      throw new Error(`Unsupported request validation type: ${validationType}`);
    }
  }
}
