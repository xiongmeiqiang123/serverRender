var express = require("express");
var path = require("path");

var fs   = require('fs');
var app = express();

var route = require('./route')

app.use(express.static(path.join(__dirname, "..", "public")));

let _app = route(app)
var server = _app.listen(7001, function() {
	console.log('Listening on port %d', server.address().port);
});
