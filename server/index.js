var express = require("express");
var path = require("path");
var page = require("./page.generated.js");
var fs   = require('fs');
var app = express();
var webshot = require('webshot');
app.use(express.static(path.join(__dirname, "..", "public")));

var stats = require("./stats.generated.json");

const options = {
	windowSize:{
		width: 2000,
		height: 768
	},
	siteType:'html',
	defaultWhiteBackground:true
}
app.get("/getImageByData", function(req, res) {
	const str = `<!DOCTYPE html> ${page(req, stats.assetsByChunkName.main)}`;
	var renderStream =	webshot(str, 'hello_world.png',options, function(err, data) {
	  res.download(path.join(__dirname,'../hello_world.png'));
	});
});


var server = app.listen(7001, function() {
	console.log('Listening on port %d', server.address().port);
});
