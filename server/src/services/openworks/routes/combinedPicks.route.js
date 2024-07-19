const express = require("express");
const router = express.Router();
const combinedPicksController = require("../controllers/combinedPicks.controller");

// Ruta para obtener picks combinados con nombres de superficie por WELL_ID
router.get("/combinedPicksByWellId/:wellId", combinedPicksController.getPicksWithSurfNamesByWellId);

// Nueva ruta para obtener todos los datos conjuntos
router.get("/combinedPicksData", combinedPicksController.getAllCombinedData);

module.exports = router;
