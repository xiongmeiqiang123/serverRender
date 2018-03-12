const webshot = require('webshot');
const page = require("../page.generated.js");
const stats = require("../stats.generated.json");
const getLines = require('../actions/getImageByData')
const router = require('express').Router();

router.post("/getImageByData",getLines);
router.post("/img/getImageByData",getLines);

module.exports = router;
