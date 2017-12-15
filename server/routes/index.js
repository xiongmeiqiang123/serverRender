var webshot = require('webshot');
var page = require("../page.generated.js");
var stats = require("../stats.generated.json");

var getLines = require('../actions/getImgs/getLines.js')

function routeEntry(req, res) {

    try {
        return getLines(req, res)
    } catch (e) {
        console.log(e, 'test');
    } finally {

    }
}
function route(app) {

    app.post("/getImageByData",routeEntry);


    return app;
}

module.exports = route;
