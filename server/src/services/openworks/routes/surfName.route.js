const express = require("express");
const router = express.Router();
const surfNameController = require("../controllers/surfName.controller");

// Ruta para obtener todos los registros de Name
router.get("/", surfNameController.getAllSurfs);

// Ruta para obtener un pick individual por su ID
router.get("/:surfId", surfNameController.getSurfById);

module.exports = router;
