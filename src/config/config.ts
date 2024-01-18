
import { config as dotenvConfig } from 'dotenv';
import * as path from 'path';
import { validateConfig } from '../utils/validation';

dotenvConfig();

const schemaConfig = require(path.join(process.cwd(), "/schema.config.js"));

export const config:any = validateConfig(schemaConfig);

