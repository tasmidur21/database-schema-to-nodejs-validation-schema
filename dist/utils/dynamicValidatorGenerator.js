"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateValidator = void 0;
const fs = __importStar(require("fs"));
const Handlebars = __importStar(require("handlebars"));
const path = __importStar(require("path"));
const utils_1 = require("./utils");
const validatorTemplateSource = fs.readFileSync(path.resolve(__dirname, '../templates/validatorjs.template.hbs'), 'utf8');
const template = Handlebars.compile(validatorTemplateSource);
function generateValidator(className, rules) {
    const classNameCammelCase = (0, utils_1.snakeToCamel)(className);
    const formattedClassName = classNameCammelCase.charAt(0).toUpperCase() + classNameCammelCase.slice(1);
    const validatorContent = template({
        className: formattedClassName,
        rules,
    });
    // const validationBaseDir = path.join(process.cwd(), `/validators`);
    // // Check if the directory exists
    // if (!fs.existsSync(validationBaseDir)) {
    //     // If not, create the directory
    //     fs.mkdirSync(validationBaseDir);
    // } else {
    //     console.log('Directory already exists.');
    // }
    // fs.writeFileSync(`${validationBaseDir}/${classNameCammelCase}.js`, validatorContent);
}
exports.generateValidator = generateValidator;
