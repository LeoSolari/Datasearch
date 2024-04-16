const mysql2 = require("mysql2/promise");

const pool = mysql2.createPool({
  host: "localhost",
  user: "leandro",
  password: "solari",
  port: 3306,
  database: "datamockdb",
});

module.exports = { pool };
