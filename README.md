# Nodejs Validation Schema Rules
[![NPM Downloads](https://img.shields.io/npm/dt/%40tasmidur%2Fnodejs-validation-schema-rules)](https://www.npmjs.com/package/@tasmidur/nodejs-validation-schema-rules)
[![npm](https://img.shields.io/npm/v/%40tasmidur%2Fnodejs-validation-schema-rules)](https://www.npmjs.com/package/indexeddb-orm)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Automatically generate basic validation rules based on your database table schema effortlessly!

This tool generates preliminary validation rules for popular libraries such as [JOI](https://www.npmjs.com/package/joi),    [ValidatorJS](https://www.npmjs.com/package/validatorjs) and [@vinejs/vine](https://www.npmjs.com/package/@vinejs/vine). These rules serve as a convenient starting point, allowing you to refine and enhance them to suit your specific needs.


## Installation

```bash
npm install @tasmidur/nodejs-validation-schema-rules
yarn add @tasmidur/nodejs-validation-schema-rules
```

Then create a schema.config.js with these configuration

```javascript
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
    requestValidatorPath: null,
    validationSchemaType:`joi`
  };
  module.exports = schemaConfig;
```

## Usage

  The `yarn/npm run schema:make-rules` command generates validation rules for a specified database table and its columns. It creates a request validation file based on the chosen validation library (choices: "joi", "validatorjs", "vine"). The generated rules can be used to enforce data integrity and validate incoming requests in your application.

  Options:
  - -db, --database: Specify the type of database (e.g., "mysql", "postgres", "sqlite").
  - -t, --table: Specify the name of the database table for which rules should be generated.
  - -c, --columns: Specify the column names of the table to generate rules for.
  - -rv, --request-validation: Specify the type of request validation file to generate (default is "joi").
  - -f, --request-file: Specify the name of the request validator file to create.
  - -h, --help: Display help for the command.

  Examples:
  - Generate rules for a MySQL table named "users" with columns "id" and "name":
    ```bash
     $ yarn run schema:make-rules -db mysql -t users -c id,name
     $ npm run schema:make-rules -db mysql -t users -c id,name
    ```

  - Generate rules for a PostgreSQL table named "users" with a request validation file using "joi":

      ```bash
       $ yarn run schema:make-rules -db postgres -t users -rv joi -f PostRequestValidator
       $ npm run schema:make-rules -db postgres -t users -rv joi -f PostRequestValidator
      ```
as same as for sqlite.

Let's say you've the table structure:

```sql
CREATE TABLE data_types (
    id INTEGER PRIMARY KEY,
    name TEXT,
    age INTEGER,
    height REAL,
    is_student BOOLEAN,
    birthdate DATE,
    registration_timestamp TIMESTAMP,
    description BLOB
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### Generate rules for a whole table

Now if you run:

```bash
  yarn run schema:make-rules -db sqlite -t data_types -rv joi
```

You'll get:
```
🚀 Schema Base Validation rules for "data_types" table generated! 🚀
Copy and paste these rules into your validation location, such as controller, form request, or any applicable place 😊
______________________________________________________________________________________________________________________

{ 
  name: Joi.string().required(),
  age: Joi.integer().min(-9223372036854775808).max(9223372036854775807).required(),
  height: Joi.number().required(),
  is_student: Joi.required(),
  birthdate: Joi.date().required(),
  registration_timestamp: Joi.required(),
  description: Joi.required(), 
}
```

### Generate rules for specific columns

You can also explicitly specify the columns:

```bash
yarn run schema:make-rules -db sqlite -t data_types -c name,age
```

Which gives you:
```

🚀 Schema Base Validation rules for "data_types" table generated! 🚀
Copy and paste these rules into your validation location, such as controller, form request, or any applicable place 😊
______________________________________________________________________________________________________________________

{ 
  name: Joi.string().required(),
  age: Joi.integer().min(-9223372036854775808).max(9223372036854775807).required(), 
}

```

### Generate Form Request Class

Optionally, you can add a `request-validation` or `-rv` flag,
which will create a form request class with the generated rules for you!

```` bash

````

### Always skip columns

To always skip columns add it in the schema.config file, under `skipColumns` attribute.

```javascript

   skipColumns: (process.env.SKIP_COLUMNS || 'created_at,updated_at,deleted_at').split(',')

```


## Supported Drivers

Supported database drivers are MySQL, PostgreSQL, and SQLite.

Validation rules may vary based on the selected driver due to differences in supported data types and range specifications.

## Testing

```bash
yarn run test
```

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.