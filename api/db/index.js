const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.RDS_HOSTNAME || process.env.LOCAL_HOSTNAME,
  port: process.env.RDS_PORT || process.env.LOCAL_PORT,
  user: process.env.RDS_USERNAME || process.env.LOCAL_USERNAME,
  password: process.env.RDS_PASSWORD || process.env.LOCAL_PASSWORD,
  database: process.env.RDS_DB_NAME || process.env.LOCAL_DB_NAME,
});

connection.connect(err => {
  if (err) throw err;
});

module.exports = connection;
