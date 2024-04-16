const { Router } = require("express");
const ping = require("../controllers/index.controllers.js");

const router = Router();

router.get("/ping", ping);

module.exports = router;
