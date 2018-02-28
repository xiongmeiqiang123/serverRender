var webshot = require('webshot');
var page = require("../../page.generated.js");
var stats = require("../../stats.generated.json");
var path = require("path");

let width = 2000,
    height = 768

module.exports = function (req, res) {

    let params = req.body || {};
    let type = params.type;
    let data = params.data || []

    if(type === 'rankingChart') {
        width = 1200;
        height = data.length * 60 + 100;
    }
    if(type === 'pie') {
        width = 1100;
        height = 850;
    }
    const options = {
    	windowSize:{
    		width: width,
    		height: height
    	},
    	siteType:'html',
    	defaultWhiteBackground:true
    }
    const str = page(req, stats.assetsByChunkName.main, params);
    var renderStream =	webshot(str, 'hello_world.png',options, function(err, data) {
      res.download(path.join(__dirname,'../../../hello_world.png'));
    });
    // res.end(str);
};
