const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Función para obtener picks por WELL_ID y los nombres de superficie asociados
exports.getPicksWithSurfNamesByWellId = (req, res) => {
    const wellId = req.params.wellId;

    // Ruta a tu base de datos SQLite
    const dbPath = path.resolve(__dirname, process.env.DB_PATH_NEUQUINA_REG);

    // Conexión a la base de datos SQLite
    const db = new sqlite3.Database(
        dbPath,
        sqlite3.OPEN_READWRITE,
        (err) => {
            if (err) {
                console.error("Error al abrir la base de datos", err.message);
                res.status(500).json({ error: "Error al abrir la base de datos" });
            } else {
                const query = `
                    SELECT p.WELL_ID, p.PICK_SURF_ID, p.PICK_OBS_NO, p.PICK_CONF_FACT , p.PICK_DEPTH, p.DATA_SOURCE, PICK_SURF_NAME
                    FROM PICK p
                    LEFT JOIN VC_PICKSURF_NAME s ON p.PICK_SURF_ID = s.PICK_SURF_ID
                    WHERE p.WELL_ID = ?;
                `;

                db.all(query, [wellId], (err, rows) => {
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

exports.getAllCombinedData = (req, res) => {
    // Ruta a tu base de datos SQLite
    const dbPath = path.resolve(__dirname, process.env.DB_PATH_NEUQUINA_REG);

    // Conexión a la base de datos SQLite
    const db = new sqlite3.Database(
        dbPath,
        sqlite3.OPEN_READWRITE,
        (err) => {
            if (err) {
                console.error("Error al abrir la base de datos", err.message);
                res.status(500).json({ error: "Error al abrir la base de datos" });
            } else {
                const query = `
                    SELECT p.WELL_ID, p.PICK_SURF_ID, p.PICK_OBS_NO, p.PICK_CONF_FACT , p.PICK_DEPTH, p.DATA_SOURCE, PICK_SURF_NAME
                    FROM PICK p
                    LEFT JOIN VC_PICKSURF_NAME s ON p.PICK_SURF_ID = s.PICK_SURF_ID;
                `;

                db.all(query, [], (err, rows) => {
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