require("dotenv").config();
const sqlite3 = require("sqlite3").verbose();

exports.getAllSeisData = (req, res) => {
  const db = new sqlite3.Database(
    process.env.DB_PATH_NEUQUINA_REG,
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        console.error("Error al abrir la base de datos", err.message);
        res.status(500).json({ error: "Error al abrir la base de datos" });
      } else {
        const query = `
          SELECT s.SEIS_GEOM_SET_ID, s.SEIS_GEOM_SET_NM, s.DATA_SOURCE, s.SEIS_3D_PROJECT_ID,
                 sd.SEISMIC_DATA_SET_ID, sd.BINSET_GRID_ID, sd.SEIS_GEOM_SET_ID, sd.GEOM_SET_TYPE
          FROM SEIS_3D_SURVEY_V s
          JOIN SEISMIC_DATA_SET sd ON s.SEIS_GEOM_SET_ID = sd.SEIS_GEOM_SET_ID
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


exports.getSeisDataById = (req, res) => {
    const seisGeomSetId = req.params.seisGeomSetId;
  
    const db = new sqlite3.Database(
      process.env.DB_PATH_NEUQUINA_REG,
      sqlite3.OPEN_READWRITE,
      (err) => {
        if (err) {
          console.error("Error al abrir la base de datos", err.message);
          res.status(500).json({ error: "Error al abrir la base de datos" });
        } else {
          const query = `
            SELECT s.SEIS_GEOM_SET_ID, s.SEIS_GEOM_SET_NM, s.DATA_SOURCE, s.SEIS_3D_PROJECT_ID,
                   sd.SEISMIC_DATA_SET_ID, sd.BINSET_GRID_ID, sd.SEIS_GEOM_SET_ID, sd.GEOM_SET_TYPE
            FROM SEIS_3D_SURVEY_V s
            JOIN SEISMIC_DATA_SET sd ON s.SEIS_GEOM_SET_ID = sd.SEIS_GEOM_SET_ID
            WHERE s.SEIS_GEOM_SET_ID = ?
          `;
          
          db.all(query, [seisGeomSetId], (err, rows) => {
            if (err) {
              console.error("Error al ejecutar la consulta", err.message);
              res.status(500).json({ error: "Error al ejecutar la consulta" });
            } else {
              if (rows.length > 0) {
                res.json(rows);
              } else {
                res.status(404).json({ error: "No se encontraron datos sísmicos con el ID dado" });
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
  