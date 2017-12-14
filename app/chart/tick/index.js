import React from 'react';

class Tick extends React.Component {

	constructor(props) {
		super(props);
	}

	render(){
		const {x, y, stroke, payload, rotate=45, textLength=15} = this.props;
			if(!payload.value) {
				return null;
			}
			let name = payload.value;
			name = name.length >textLength? name.slice(0,textLength) + '...' : name;
			return (
			<g transform={`translate(${x},${y})`}>
		        <text x={-5} y={-12} dy={16} textAnchor="end" style={{fontSize: 12}} fill="#666" transform={`rotate(-${rotate})`}>{name}</text>
			</g>
		);
	}
}

export default Tick;
