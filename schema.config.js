require("dotenv").config();
const schemaConfig = {
    defaultDatabase: process.env.DEFAULT_CONNECTION || '',
    databases: {
      postgres: {
        host: process.env.PG_DB_HOST || '',
        port: parseInt(process.env.PG_DB_PORT, 10) || 5432,
        user: process.env.PG_DB_USER || '',
        password: process.env.PG_DB_PASSWORD || '',
        database: process.env.PG_DB_DATABASE || '',
      },
      mysql: {
        host: process.env.MYSQL_DB_HOST || '',
        port: parseInt(process.env.MYSQL_DB_PORT, 10) || 3306,
        user: process.env.MYSQL_DB_USER || '',
        password: process.env.MYSQL_DB_PASSWORD || '',
        database: process.env.MYSQL_DB_DATABASE || '',
      },
      sqlite: {
        database: process.env.SQLITE_DB || '',
      },
    },
    skipColumns: (process.env.SKIP_COLUMNS || 'created_at,updated_at,deleted_at').split(','),
    requestValidatorPath:`request-validators`
  };
  module.exports = schemaConfig;