
import { config as dotenvConfig } from 'dotenv';
import * as path from 'path';

dotenvConfig();

const schemaConfig = require(path.join(process.cwd(), "/schema.config.js"));
console.log(path.join(process.cwd(), "/schema.config.js"));

const databaseType=schemaConfig.default;
const database=schemaConfig[databaseType];

export const config:any = {
    database_type: databaseType,
    database: database
};

