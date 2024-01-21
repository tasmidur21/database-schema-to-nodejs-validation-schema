import { IRequestSchemaGenerator } from '../contacts/RequestSchemaGenerator';
import { templateSetting } from '../contacts/TemplateSetting';
export class JoiRequestSchemaGenerator implements IRequestSchemaGenerator{
    private templateSetting:templateSetting;
    constructor(templateSetting:templateSetting){
        this.templateSetting=templateSetting;
    }
    buildAndStore():any {
        throw new Error('Method not implemented.');
    }
    
}