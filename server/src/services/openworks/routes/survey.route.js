const express = require("express");
const router = express.Router();
const surveyController = require("../controllers/survey.controller");

// Ruta para obtener todos los registros de DIR_SURVEY_PT
router.get("/", surveyController.getAllSurveys);

// Ruta para obtener un pozo individual por su ID
router.get("/:surveyId", surveyController.getAllSurveysById);

module.exports = router;
