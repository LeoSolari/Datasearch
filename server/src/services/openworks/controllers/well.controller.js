require("dotenv").config();

const sqlite3 = require("sqlite3").verbose();

exports.getAllWells = (req, res) => {
  const db = new sqlite3.Database(
    process.env.DB_PATH_ORIG,
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        console.error("Error al abrir la base de datos", err.message);
        res.status(500).json({ error: "Error al abrir la base de datos" });
      } else {
        db.all("SELECT * FROM WELL_MASTER", (err, rows) => {
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
        });
      }
    }
  );
};

exports.getWellById = (req, res) => {
  const wellId = req.params.wellId;

  const db = new sqlite3.Database(
    process.env.DB_PATH_ORIG,
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        console.error("Error al abrir la base de datos", err.message);
        res.status(500).json({ error: "Error al abrir la base de datos" });
      } else {
        db.get(
          "SELECT * FROM WELL_MASTER WHERE WELL_ID = ?",
          [wellId],
          (err, row) => {
            if (err) {
              console.error("Error al ejecutar la consulta", err.message);
              res.status(500).json({ error: "Error al ejecutar la consulta" });
            } else {
              if (row) {
                res.json(row);
              } else {
                res.status(404).json({ error: "Pozo no encontrado" });
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
