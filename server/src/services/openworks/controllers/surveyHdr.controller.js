require("dotenv").config();

const sqlite3 = require("sqlite3").verbose();

// DIR SURVEY HDR

exports.getAllSurveys = (req, res) => {
  const db = new sqlite3.Database(
    process.env.DB_PATH_NEUQUINA_REG,
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        console.error("Error al abrir la base de datos", err.message);
        res.status(500).json({ error: "Error al abrir la base de datos" });
      } else {
        db.all("SELECT WELL_ID, SURVEY_NAME, DATA_SOURCE, CREATE_DATE, UPDATE_DATE, COMPANY_NAME, SURVEY_CALC_MTHD, NORTH_REFERENCE, PREFERRED_SURVEY_IND, TOTAL_SAMPLES, SCALE_TYPE, MAX_INCLINATION, MAX_LATERAL_DISTANCE FROM DIR_SURVEY_HDR", (err, rows) => {
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

// Función para obtener todas las surveys con un ID dado
exports.getAllSurveysById = (req, res) => {
  const surveyId = req.params.surveyId;

  const db = new sqlite3.Database(
    process.env.DB_PATH_NEUQUINA_REG,
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        console.error("Error al abrir la base de datos", err.message);
        res.status(500).json({ error: "Error al abrir la base de datos" });
      } else {
        db.all(
          "SELECT WELL_ID, SURVEY_NAME, DATA_SOURCE, CREATE_DATE, UPDATE_DATE, COMPANY_NAME, SURVEY_CALC_MTHD, NORTH_REFERENCE, PREFERRED_SURVEY_IND, TOTAL_SAMPLES, SCALE_TYPE, MAX_INCLINATION, MAX_LATERAL_DISTANCE FROM DIR_SURVEY_HDR WHERE WELL_ID = ?",
          [surveyId],
          (err, rows) => {
            if (err) {
              console.error("Error al ejecutar la consulta", err.message);
              res.status(500).json({ error: "Error al ejecutar la consulta" });
            } else {
              if (rows.length > 0) {
                res.json(rows);
              } else {
                res
                  .status(404)
                  .json({ error: "No se encontraron surveys con el ID dado" });
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
