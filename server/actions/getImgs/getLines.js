var webshot = require('webshot');
var page = require("../../page.generated.js");
var stats = require("../../stats.generated.json");
var path = require("path");

module.exports = function (req, res) {
    const options = {
    	windowSize:{
    		width: 2000,
    		height: 768
    	},
    	siteType:'html',
    	defaultWhiteBackground:true
    }
    const str = page(req, stats.assetsByChunkName.main);
    var renderStream =	webshot(str, 'hello_world.png',options, function(err, data) {
      res.download(path.join(__dirname,'../../../hello_world.png'));
    });
    // res.end(str);
};
