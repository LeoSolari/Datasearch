const { pool } = require("../db.js");

const getUsers = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM user");
  res.send(rows);
};

const getUser = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM user WHERE id = ?", [
    req.params.id,
  ]);

  if (rows.length === 0) {
    res.status(404).json({ message: "Usuario no encontrado" });
  } else {
    res.send(rows[0]);
  }
};

const postUsers = async (req, res) => {
  const { name, salary } = req.body;
  const [rows] = await pool.query(
    "INSERT INTO user (name, salary) VALUES(?, ?)",
    [name, salary]
  );

  res.send({ id: rows.insertId, name, salary });
};

const deleteUsers = async (req, res) => {
  const [result] = await pool.query("DELETE FROM user WHERE id = ?", [
    req.params.id,
  ]);

  if (result.affectedRows <= 0) {
    res.status(404).json({
      message: "Usuario no encontrado",
    });
  } else {
    res.status(204).json({ message: "Usuario eliminado" });
  }
};

module.exports = { getUsers, postUsers, deleteUsers, getUser };
