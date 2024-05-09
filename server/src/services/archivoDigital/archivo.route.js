const express = require("express");
const router = express.Router();
const archivoController = require("./archivo.controller");

router.get("/", async (req, res) => {
  try {
    const files = await archivoController.obtenerContenido(
      "/Users/54226/Desktop/PAMI"
    );
    res.json(files);
  } catch (error) {
    console.error("Error al obtener contenido de la carpeta:", error);
    res.status(500).json({ error: "Error al obtener contenido de la carpeta" });
  }
});

module.exports = router;
