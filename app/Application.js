import React from 'react'
import LineChart from './chart/lineChart.js'
import Pie from './chart/pie'
import BarChart from './chart/barChart.js'
import RankingChart from './chart/rankingbar'

class Application extends React.Component {
	constructor(props) {
		super(props);

	}
	render() {

		const {settings=[], data=[], title, type} = this.props;

		let ChartComponent ;
		switch (type) {
			case Pie.type:
				ChartComponent = Pie;
				break;
			case LineChart.type:
				ChartComponent = LineChart;
				break;
			case BarChart.type:
				ChartComponent = BarChart;
				break;
			case RankingChart.type:
				ChartComponent = RankingChart;
				break;
			default:
				ChartComponent = ()=> `没有这种图`
		}
		console.log(ChartComponent, 'ChartComponent');
        return (

            <div style={{width:'100%', backgroundColor: 'white'}}>
                <ChartComponent data={data} settings={settings.map((y) => ({y}))} title={title}></ChartComponent>
            </div>


		);
	}
}

export default Application
