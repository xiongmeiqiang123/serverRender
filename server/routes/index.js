const webshot = require('webshot');
const page = require("../page.generated.js");
// const stats = require("../stats.generated.json");
const getLines = require('../actions/getImageByData')
const getLinesGet = require('../actions/getImageByData/get.js')
const router = require('express').Router();

router.post("/getImageByData",getLines);
router.get("/getImageByData",getLinesGet);
router.post("/img/getImageByData",getLines);

module.exports = router;
