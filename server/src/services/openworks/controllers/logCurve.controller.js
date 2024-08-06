require("dotenv").config();
const sqlite3 = require("sqlite3").verbose();

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
          "SELECT lh.LOG_CRV_NAME_ID, lh.WELL_ID, lh.SERVICE_NAME, lh.LOG_CRV_NAME_ID, LOGGING_JOB_NO, LOG_CRV_VERSION, vc.LOG_CRV_NAME, lh.TOTAL_SAMPLES, lh.TOP_DEPTH, lh.BASE_DEPTH FROM LOG_CURVE_HEADER lh INNER JOIN VC_LOG_CRV_NAME vc ON lh.LOG_CRV_NAME_ID = vc.LOG_CRV_NAME_ID",
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
          "SELECT lh.WELL_ID, lh.LOG_CRV_NAME_ID, lh.SERVICE_NAME, lh.LOG_CRV_NAME_ID, vc.LOG_CRV_NAME, lh.TOTAL_SAMPLES, lh.TOP_DEPTH, lh.BASE_DEPTH, lh.LOG_RUN_NO, lh.CRV_INCREM, lh.LOG_CRV_VERSION, lh.LOG_CRV_UNIT_MEAS FROM LOG_CURVE_HEADER lh INNER JOIN VC_LOG_CRV_NAME vc ON lh.LOG_CRV_NAME_ID = vc.LOG_CRV_NAME_ID WHERE lh.WELL_ID = ?",
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

exports.getLogCurvesByName = (req, res) => {
  const logName = req.params.logName.toLowerCase();

  const db = new sqlite3.Database(
    process.env.DB_PATH_NEUQUINA_REG,
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        console.error("Error al abrir la base de datos", err.message);
        res.status(500).json({ error: "Error al abrir la base de datos" });
      } else {
        db.all(
          `SELECT lh.WELL_ID, lh.LOG_CRV_NAME_ID, lh.SERVICE_NAME, vc.LOG_CRV_NAME,
                  lh.TOTAL_SAMPLES, lh.TOP_DEPTH, lh.BASE_DEPTH, lh.LOG_RUN_NO,
                  lh.CRV_INCREM, lh.LOG_CRV_VERSION, lh.LOG_CRV_UNIT_MEAS,
                  wm.WELL_NAME_FREE
           FROM LOG_CURVE_HEADER lh
           INNER JOIN VC_LOG_CRV_NAME vc ON lh.LOG_CRV_NAME_ID = vc.LOG_CRV_NAME_ID
           INNER JOIN WELL_MASTER wm ON lh.WELL_ID = wm.WELL_ID
           WHERE LOWER(vc.LOG_CRV_NAME) LIKE ?`,
          [`%${logName}%`], // Use the LIKE operator with wildcards
          (err, rows) => {
            if (err) {
              console.error("Error al ejecutar la consulta", err.message);
              res.status(500).json({ error: "Error al ejecutar la consulta" });
            } else {
              if (rows.length > 0) {
                res.json(rows);
              } else {
                res.status(404).json({ error: "No se encontraron registros con el nombre dado" });
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
