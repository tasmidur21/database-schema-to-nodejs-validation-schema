// dynamicValidatorGenerator.ts
import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as path from 'path';
const validatorTemplateSource = fs.readFileSync('src/templates/validationTemplate.template.hbs', 'utf8');
const template = Handlebars.compile(validatorTemplateSource);

interface Rule {
    field: string;
    rules: string;
}

export function generateValidator(className: string, rules: Rule[]): void {
    const classNameCammelCase = snakeToCamel(className);
    const formattedClassName = classNameCammelCase.charAt(0).toUpperCase() + classNameCammelCase.slice(1);
    const validatorContent = template({
        className: formattedClassName,
        rules
    });
    const validationBaseDir = path.join(process.cwd(), `/validators`);
    // Check if the directory exists
    if (!fs.existsSync(validationBaseDir)) {
        // If not, create the directory
        fs.mkdirSync(validationBaseDir);

    } else {
        console.log('Directory already exists.');
    }
    fs.writeFileSync(`${validationBaseDir}/${classNameCammelCase}.js`, validatorContent);
}

export function snakeToCamel(str: string) {
    return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
}


