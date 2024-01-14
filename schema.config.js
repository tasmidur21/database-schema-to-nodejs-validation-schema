require("dotenv").config();
const processEnv = process.env;
module.exports={
    name:"schemaConfig",
    howImport: "require",
    default: 'mysql',
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
}