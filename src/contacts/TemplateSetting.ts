import { RequestSchemaClassMap } from "./RequestSchemaClassMap";

export interface templateSetting{
    rules:string[],
    fileName:(keyof RequestSchemaClassMap),
    stroreDir?:string
}