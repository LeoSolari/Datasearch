const express = require("express");
const router = express.Router();
const logCurveController = require("../controllers/logCurve.controller");

// Ruta para obtener todos los registros de DIR_SURVEY_PT
router.get("/", logCurveController.getAllLogCurves);

// Ruta para obtener un pozo individual por su ID
router.get("/:logId", logCurveController.getAllLogCurvesById);

module.exports = router;
