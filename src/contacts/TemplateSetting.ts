import { RequestSchemaClassMap } from "./RequestSchemaClassMap";

export interface templateSetting{
    fileName:string,
    rules:string[],
    templateType:(keyof RequestSchemaClassMap),
    stroreDir?:string
}