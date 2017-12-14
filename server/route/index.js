var webshot = require('webshot');
var page = require("../page.generated.js");
var stats = require("../stats.generated.json");

var getLines = require('../actions/getImgs/getLines.js')
function route(app) {

    app.get("/getImageByData",getLines);


    return app;
}

module.exports = route;
