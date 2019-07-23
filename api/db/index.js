const mysql = require('mysql');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production' ? 'RDS' : 'LOCAL';

const connection = mysql.createConnection({
  host: process.env[`${isProduction}_HOSTNAME`],
  port: process.env[`${isProduction}_PORT`],
  user: process.env[`${isProduction}_USERNAME`],
  password: process.env[`${isProduction}_PASSWORD`],
  database: process.env[`${isProduction}_DB_NAME`]
});

connection.connect(err => {
  if (err) throw err;
});

module.exports = connection;
