import { templateSetting } from '../../contacts/TemplateSetting';
import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as path from 'path';
import { snakeToCamel } from '../manipulation';

const CLASS_NAME_SUFFIX='RequestValidator'
const templateSource = fs.readFileSync(path.resolve(__dirname,'../templates/validationTemplate.template.hbs'), 'utf8');
export class ValidatorJsRequestSchemaGenerator{
    private templateSetting:templateSetting;
    private templateFile:any;
    constructor(templateSetting:templateSetting){
        this.templateSetting=templateSetting;
        this.templateFile=templateSource;
    }
    public async build(){
          
    }
    private getClassName(className:string){
        return `${snakeToCamel(className)}`
    }
}