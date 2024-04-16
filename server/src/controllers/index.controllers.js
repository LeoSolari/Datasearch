const { pool } = require("../db.js");

const ping = async (req, res) => {
  const [result] = await pool.query('SELECT "Pong" AS result');
  res.json(result[0]);
};

module.exports = ping;
