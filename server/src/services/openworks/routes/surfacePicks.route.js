const express = require("express");
const router = express.Router();
const surfacePicksController = require("../controllers/surfacePicks.controller");

// Ruta para obtener todos los registros de PICKS
router.get("/", surfacePicksController.getAllPicks);

// Ruta para obtener un pick individual por su ID
router.get("/:pickId", surfacePicksController.getPickById);

module.exports = router;
