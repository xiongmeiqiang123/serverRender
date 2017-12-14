var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser')
var route = require('./routes')

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(bodyParser.json({limit: '1mb'})) //解析post数据

let _app = route(app)

var server = _app.listen(7001, function() {
	console.log('Listening on port %d', server.address().port);
});
