require("dotenv").config();

const sqlite3 = require("sqlite3").verbose();

exports.getAllWells = (req, res) => {
  const db = new sqlite3.Database(
    process.env.DB_PATH_NEUQUINA_REG,
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
    process.env.DB_PATH_NEUQUINA_REG,
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        console.error("Error al abrir la base de datos", err.message);
        res.status(500).json({ error: "Error al abrir la base de datos" });
      } else {
        db.get(
          "SELECT WELL_ID, WELL_UWI, CURRENT_WELL_LEASE_NAME, CURRENT_WELL_LEASE_NO, DATA_SOURCE, DEPTH_DATUM, DEPTH_DATUM_OUOM, DEPTH_DATUM_TYPE, FIELD, FINAL_TD, FINAL_TD_OUOM, WELL_NAME_FREE, WL_COUNTRY, WL_ORIG_X_LON, WL_ORIG_Y_LAT, WL_SURFACE_LATITUDE, WL_SURFACE_LONGITUDE, WL_SURFACE_X_COORDINATE, WL_SURFACE_Y_COORDINATE, WL_WELL_LOCATION_NAME, WL_WELL_LOCATION_UWI, CREATE_DATE, CREATE_USER_ID, UPDATE_USER_ID, UPDATE_DATE, GROUND_ELEV FROM WELL_MASTER WHERE WELL_ID = ?",
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
