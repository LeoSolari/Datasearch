require("dotenv").config();

const sqlite3 = require("sqlite3").verbose();

// DIR SURVEY PT

exports.getAllSurveys = (req, res) => {
  const db = new sqlite3.Database(
    process.env.DB_PATH_ORIG,
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        console.error("Error al abrir la base de datos", err.message);
        res.status(500).json({ error: "Error al abrir la base de datos" });
      } else {
        db.all("SELECT * FROM DIR_SURVEY_PT", (err, rows) => {
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
    process.env.DB_PATH_ORIG,
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        console.error("Error al abrir la base de datos", err.message);
        res.status(500).json({ error: "Error al abrir la base de datos" });
      } else {
        db.all(
          "SELECT * FROM DIR_SURVEY_PT WHERE WELL_ID = ?",
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
