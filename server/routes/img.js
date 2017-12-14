var express = require('express')
var router = express.Router()
var getLines = require('../actions/getImgs/getLines.js')

const routers = router
  .get('/img/getImageByData', getLines)
  .post('/img/getImageByData', getLines)

module.exports = routers
