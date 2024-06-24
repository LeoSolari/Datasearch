const express = require("express");
const router = express.Router();
const surveyHdrController = require("../controllers/surveyHdr.controller");

// Ruta para obtener todos los registros de DIR_SURVEY_PT
router.get("/", surveyHdrController.getAllSurveys);

// Ruta para obtener un pozo individual por su ID
router.get("/:surveyId", surveyHdrController.getAllSurveysById);

module.exports = router;