const sqlite3 = require("sqlite3").verbose();

// Ruta de tu base de datos SQLite
const DB_PATH = "/Users/54226/Desktop/EMBEDDED_DB/PRUEBA_REG.db";

// Función para obtener todos los registros de WELL_MASTER
exports.getAllWells = (req, res) => {
  // Conectarse a la base de datos SQLite
  const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error("Error al abrir la base de datos", err.message);
      res.status(500).json({ error: "Error al abrir la base de datos" });
    } else {
      // Ejecutar la consulta para obtener todos los registros de WELL_MASTER
      db.all("SELECT * FROM WELL_MASTER", (err, rows) => {
        if (err) {
          console.error("Error al ejecutar la consulta", err.message);
          res.status(500).json({ error: "Error al ejecutar la consulta" });
        } else {
          // Enviar los resultados como respuesta
          res.json(rows);
        }
        // Cerrar la conexión a la base de datos
        db.close((err) => {
          if (err) {
            console.error("Error al cerrar la base de datos", err.message);
          }
        });
      });
    }
  });
};

// Función para obtener un pozo individual por su WELL_ID
exports.getWellById = (req, res) => {
  const wellId = req.params.wellId;

  // Conectarse a la base de datos SQLite
  const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error("Error al abrir la base de datos", err.message);
      res.status(500).json({ error: "Error al abrir la base de datos" });
    } else {
      // Ejecutar la consulta para obtener el pozo por su WELL_ID
      db.get(
        "SELECT * FROM WELL_MASTER WHERE WELL_ID = ?",
        [wellId],
        (err, row) => {
          if (err) {
            console.error("Error al ejecutar la consulta", err.message);
            res.status(500).json({ error: "Error al ejecutar la consulta" });
          } else {
            if (row) {
              // Si se encontró el pozo, enviarlo como respuesta
              res.json(row);
            } else {
              // Si no se encontró el pozo, enviar un mensaje de error
              res.status(404).json({ error: "Pozo no encontrado" });
            }
          }
          // Cerrar la conexión a la base de datos
          db.close((err) => {
            if (err) {
              console.error("Error al cerrar la base de datos", err.message);
            }
          });
        }
      );
    }
  });
};
