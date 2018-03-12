const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser')
const router = require('./routes')
const cors = require('cors')

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(bodyParser.json({limit: '1mb'})) //解析post数据
app.use(cors())

app.use(function(req, res, next) {
    console.log("Time:", Date.now());
    console.log("Request URL:", req.originalUrl);
    console.log('Request Type:', req.method);
    next();
});

app.use('/', router)
const server = app.listen(7001, function() {
	console.log('Listening on port %d', server.address().port);
});
