/** @jsx React.DOM */

var React = require("react");
var ReactDOMServer = require('react-dom/server');
var Application = require("../app/Application").default;

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div style={{backgroundColor: 'white', padding: '20px 10px'}}>
				<Application></Application>
			</div>
        );
    }
}

// var styleCollector = require("./style-collector");

module.exports = function(req, scriptFilename) {

	return ReactDOMServer.renderToStaticMarkup(
		<div>
			<Index></Index>
		</div>
	);
}
