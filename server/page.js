var React = require("react");
var ReactDOMServer = require('react-dom/server');
var Application = require("../app/Application").default;


module.exports = function(req, scriptFilename, query={}) {
    const settings = query.settings || [],
        data = query.data || [],
        title = query.title,
        type = query.type
    const pageStr = ReactDOMServer.renderToStaticMarkup(
        <html lang="en">
            <head>
                <meta charset="utf-8"/>
                <link rel="stylesheet" media="all" href="/assets/styles.css"/>
            </head>
            <body>
                <div id="content">
                    <Application settings={settings} data={data} title={title} type={type}></Application>
                </div>
            </body>
            <script src='/assets/bundle.js'></script>
        </html>
	);
	return `<!DOCTYPE html> ${pageStr}`;
}
