
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
const processEnv = process.env;

export const config:any = {
    default: processEnv.DEFAULT_CONNECTION??"postgres",
    postgres: {
        host: processEnv.PG_DB_HOST,
        port: processEnv.PG_DB_PORT,
        user: processEnv.PG_DB_USER,
        password: processEnv.PG_DB_PASSWORD,
        database: processEnv.PG_DB_DATABASE,
    },
    mysql: {
        host: processEnv.MYSQL_DB_HOST,
        port: processEnv.MYSQL_DB_PORT,
        user: processEnv.MYSQL_DB_USER,
        password: processEnv.MYSQL_DB_PASSWORD,
        database: processEnv.MYSQL_DB_DATABASE,
    },
    sqlite: {
        database: processEnv.SQLITE_DB,
    }
};

