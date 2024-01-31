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
exports.initSchema = exports.storeFile = exports.buildTemplateContent = exports.getClassName = exports.snakeToCamel = exports.arrayIntersection = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function arrayIntersection(arr1, arr2) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    return [...set1].filter((value) => set2.has(value));
}
exports.arrayIntersection = arrayIntersection;
function snakeToCamel(str) {
    return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
}
exports.snakeToCamel = snakeToCamel;
function getClassName(value, format) {
    const classNameCammelCase = format.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        return value[key] !== undefined ? `${value[key]}` : match;
    });
    return (classNameCammelCase.charAt(0).toUpperCase() + classNameCammelCase.slice(1));
}
exports.getClassName = getClassName;
const buildTemplateContent = (template, replacements) => {
    return Object.keys(replacements).reduce((result, key) => {
        const placeholder = `#__${key}__#`;
        return result.replace(new RegExp(placeholder, 'g'), replacements[key]);
    }, template);
};
exports.buildTemplateContent = buildTemplateContent;
function storeFile(content, fileName, directory, extention = 'js') {
    const fullPath = path.join(process.cwd(), directory);
    if (!fs.existsSync(fullPath)) {
        // If not, create the directory
        fs.mkdirSync(fullPath, { recursive: true });
    }
    return fs.writeFileSync(`${fullPath}/${fileName}.${extention}`, content);
}
exports.storeFile = storeFile;
function initSchema() {
    const templateSource = fs.readFileSync(path.resolve(__dirname, '../templates/schema.config.template'), 'utf8');
    storeFile(templateSource, ".schema-config", "/");
}
exports.initSchema = initSchema;
