import React from 'react'
import {LineChart,XAxis, Line, YAxis,Tooltip, CartesianGrid, Legend} from 'recharts'
import Chart from './chart'

class Application extends React.Component {
	constructor(props) {
		super(props);

	}
	render() {

		const {settings=[], data=[], title} = this.props;
		// console.log(settings, data, title);
        // const settings = ['MIMAX2(oxygen)','RedmiNote4X(mido)','MI6(sagit)','MIX2(chiron)','MiNote3(jason)','Redmi4X(santoni)','MI5X(tiffany)','RedmiNote5A(ugg)',].map((y) => ({y}))
        return (

            <div style={{width:'100%', backgroundColor: 'white'}}>
                <Chart data={data} settings={settings.map((y) => ({y}))} title={title}></Chart>
            </div>


		);
	}
}

export default Application
