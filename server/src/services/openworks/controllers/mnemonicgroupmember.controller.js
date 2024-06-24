require("dotenv").config();
const sqlite3 = require("sqlite3").verbose();

// Obtener todos los registros de CURVE_MNEMONIC_GROUP_MEMBER
exports.getAllmnemonicgroupmembers = (req, res) => {
  const db = new sqlite3.Database(
    process.env.DB_PATH_NEUQUINA_REG,
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        console.error("Error al abrir la base de datos", err.message);
        res.status(500).json({ error: "Error al abrir la base de datos" });
      } else {
        db.all(
          "SELECT * FROM CURVE_MNEMONIC_GROUP_MEMBER",
          (err, rows) => {
            if (err) {
              console.error("Error al ejecutar la consulta", err.message);
              res.status(500).json({ error: "Error al ejecutar la consulta" });
            } else {
              res.json(rows);
            }

            db.close((err) => {
              if (err) {
                console.error("Error al cerrar la base de datos", err.message);
              }
            });
          }
        );
      }
    }
  );
};

exports.getAllmnemonicgroupmembersByGroupNameId = (req, res) => {
  const groupNameId = req.params.groupNameId; // Obtener el CRV_GROUP_NAME_ID desde los parámetros de la solicitud

  const db = new sqlite3.Database(
    process.env.DB_PATH_NEUQUINA_REG,
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        console.error("Error al abrir la base de datos", err.message);
        res.status(500).json({ error: "Error al abrir la base de datos" });
      } else {
        db.all(
          "SELECT * FROM CURVE_MNEMONIC_GROUP_MEMBER WHERE CRV_GROUP_NAME_ID = ?",
          [groupNameId],
          (err, rows) => {
            if (err) {
              console.error("Error al ejecutar la consulta", err.message);
              res.status(500).json({ error: "Error al ejecutar la consulta" });
            } else {
              if (rows.length > 0) {
                res.json(rows);
              } else {
                res.status(404).json({
                  error: "No se encontraron registros con el ID dado",
                });
              }
            }

            db.close((err) => {
              if (err) {
                console.error("Error al cerrar la base de datos", err.message);
              }
            });
          }
        );
      }
    }
  );
};