require("dotenv").config();

const sqlite3 = require("sqlite3").verbose();

// Función para obtener todas las encuestas
exports.getAllPicks = (req, res) => {
  const db = new sqlite3.Database(
    process.env.DB_PATH_NEUQUINA_REG,
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        console.error("Error al abrir la base de datos", err.message);
        res.status(500).json({ error: "Error al abrir la base de datos" });
      } else {
        const query = `
          SELECT p.WELL_ID, p.PICK_SURF_ID, PICK_CONF_FACT, p.PICK_OBS_NO, p.PICK_DEPTH, p.ORIGINAL_DATA_SOURCE, w.WELL_UWI, w.WELL_NAME_FREE, s.PICK_SURF_NAME
          FROM PICK p
          JOIN WELL_MASTER w ON p.WELL_ID = w.WELL_ID
          JOIN VC_PICKSURF_NAME s ON p.PICK_SURF_ID = s.PICK_SURF_ID
        `;
        
        db.all(query, (err, rows) => {
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

// Función para obtener una encuesta por su ID
exports.getPickById = (req, res) => {
  const pickId = req.params.pickId;

  const db = new sqlite3.Database(
    process.env.DB_PATH_NEUQUINA_REG,
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        console.error("Error al abrir la base de datos", err.message);
        res.status(500).json({ error: "Error al abrir la base de datos" });
      } else {
        const query = `
          SELECT p.WELL_ID, p.PICK_SURF_ID, PICK_CONF_FACT, p.PICK_OBS_NO, p.PICK_DEPTH, p.ORIGINAL_DATA_SOURCE, w.WELL_UWI, w.WELL_NAME_FREE, s.PICK_SURF_NAME
          FROM PICK p
          JOIN WELL_MASTER w ON p.WELL_ID = w.WELL_ID
          JOIN VC_PICKSURF_NAME s ON p.PICK_SURF_ID = s.PICK_SURF_ID
          WHERE p.WELL_ID = ?
        `;
        
        db.all(query, [pickId], (err, rows) => {
          if (err) {
            console.error("Error al ejecutar la consulta", err.message);
            res.status(500).json({ error: "Error al ejecutar la consulta" });
          } else {
            if (rows.length > 0) {
              res.json(rows);
            } else {
              res
                .status(404)
                .json({ error: "No se encontraron encuestas con el ID dado" });
            }
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
