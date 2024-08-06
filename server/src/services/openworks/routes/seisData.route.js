const express = require('express');
const { getAllSeisData, getSeisDataById } = require('../controllers/seisData.controller');
const router = express.Router();

router.get('/seisdata', getAllSeisData);
router.get('/seisdata/:seisGeomSetId', getSeisDataById);

module.exports = router;
