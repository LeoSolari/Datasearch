const express = require("express");
const router = express.Router();
const crvNameController = require("../controllers/crvName.controller");

// Ruta para obtener todos los registros de Name
router.get("/", crvNameController.getAllcrvNames);

// Ruta para obtener un pick individual por su ID
router.get("/:crvNameId", crvNameController.getcrvNameById);

module.exports = router;
