const express = require("express");
const router = express.Router();
const wellController = require("../controllers/well.controller");

// Ruta para obtener todos los pozos
router.get("/", wellController.getAllWells);

// Ruta para obtener un pozo individual por su WELL_ID
router.get("/:wellId", wellController.getWellById);

module.exports = router;
