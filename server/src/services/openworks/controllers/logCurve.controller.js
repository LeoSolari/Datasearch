require("dotenv").config();
const sqlite3 = require("sqlite3").verbose();

// Obtener todos los registros de LOG_CURVE_HEADER
exports.getAllLogCurves = (req, res) => {
  const db = new sqlite3.Database(
    process.env.DB_PATH_NEUQUINA_REG,
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        console.error("Error al abrir la base de datos", err.message);
        res.status(500).json({ error: "Error al abrir la base de datos" });
      } else {
        db.all(
          "SELECT LOG_CURVE_ID, WELL_ID, SERVICE_NAME, LOG_CRV_NAME_ID, TOTAL_SAMPLES, TOP_DEPTH, BASE_DEPTH FROM LOG_CURVE_HEADER",
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

// Obtener un registro de LOG_CURVE_HEADER por su LOG_CURVE_ID
exports.getAllLogCurvesById = (req, res) => {
  const logId = req.params.logId;

  const db = new sqlite3.Database(
    process.env.DB_PATH_NEUQUINA_REG,
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        console.error("Error al abrir la base de datos", err.message);
        res.status(500).json({ error: "Error al abrir la base de datos" });
      } else {
        db.all(
          "SELECT LOG_CURVE_ID, WELL_ID, SERVICE_NAME, LOG_CRV_NAME_ID, TOTAL_SAMPLES, TOP_DEPTH, BASE_DEPTH FROM LOG_CURVE_HEADER WHERE LOG_CURVE_ID = ?",
          [logId],
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
