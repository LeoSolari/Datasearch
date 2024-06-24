const express = require("express");
const router = express.Router();
const mnemonicgroupmemberController = require("../controllers/mnemonicgroupmember.controller");

// Ruta para obtener todos los registros de CURVE_MNEMONIC_GROUP_MEMBER
router.get("/", mnemonicgroupmemberController.getAllmnemonicgroupmembers);

// Ruta para obtener un registro individual por su CRV_GROUP_NAME_ID
router.get("/:groupNameId", mnemonicgroupmemberController.getAllmnemonicgroupmembersByGroupNameId);

module.exports = router;
