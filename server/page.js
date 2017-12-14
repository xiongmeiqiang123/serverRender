var React = require("react");
var ReactDOMServer = require('react-dom/server');
var Application = require("../app/Application").default;


module.exports = function(req, scriptFilename) {
    console.log(scriptFilename,'scriptFilename');
    const pageStr = ReactDOMServer.renderToStaticMarkup(
        <html lang="en">
            <head>
                <link rel="stylesheet" media="all" href="/assets/styles.css"/>
            </head>
            <body>
                <div id="content">
                    <Application></Application>
                </div>
            </body>
            <script src='/assets/bundle.js'></script>
        </html>
	);
	return `<!DOCTYPE html> ${pageStr}`;
}
