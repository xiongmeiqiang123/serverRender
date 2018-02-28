import  React from 'react'
import color from '../colors'
import CustomizedAxisTick from './tick'
import {BarChart,XAxis, Bar, YAxis,Tooltip, CartesianGrid, Legend, ReferenceLine, Label} from 'recharts'
const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];
function dataFormat(data=[], setting={}, formatData, resultData=[]){
    // let resultData = [];
    data.map((elem, i) => {
        let o = {...elem},
            result = Number(elem[setting.y]);

        elem[setting.y] = formatData ? formatData(result) : result;
        o[setting.name] = elem[setting.y];
        if( elem[setting.y + '-attach']) {
            o[setting.name + '-attach'] = elem[setting.y+ '-attach'];
        }
        resultData[i] = Object.assign({}, resultData[i], o);
    });
    return resultData;
}

class Chart extends React.Component {
	constructor(props) {
		super(props);

	}
	render() {
        const {data=[], title, settings=[], formatData, yDangerousValue} = this.props;
        let resultData = []
        let Bars = settings.map((item, index) => {
            resultData = dataFormat(data, item, formatData, resultData);
            return <Bar
                    connectNulls={true}
				   dataKey={item.y}
				   fill={item.color || color[index]}
				   stroke={item.color || color[index]}
                   type="monotone"
                   activeDot={{r: 8}}
				/>
        })
		return (
			<div style={{width:'100%', backgroundColor: 'white'}}>
                <style>
                    {`.recharts-legend-wrapper{
                        top: -15px !important;
                    }`}
                </style>
                <div style={{margin:'auto', textAlign: 'center'}}>
                    <h2 style={{padding: 10}}>{title}</h2>
    				<BarChart width={1900} height={750} data={resultData}
                        style={{ margin: 'auto'}}
        	            margin={{top: 5, right: 30, left: 20, bottom: 5}}>

                        <XAxis dataKey="index" tick={<CustomizedAxisTick/>} />
                        <YAxis  domain={[0, `dataMax+${parseInt(yDangerousValue||0)}`]} scale='sqrt'/>
                        <CartesianGrid strokeDasharray="3 3"/>;
                        <ReferenceLine y={yDangerousValue} stroke="red" strokeDasharray="3 3" strokeWidth='3' isFront={true} label={<CustomizedLabel yDangerousValue={yDangerousValue}></CustomizedLabel>} />
                        <Tooltip/>
                        <Legend style={{top: -25}} verticalAlign='top'/>
                        {
                            Bars
                        }
    				</BarChart>
                </div>
			</div>
		);
	}
}


function CustomizedLabel(props={}){
    const {yDangerousValue,viewBox={}} = props;
	const {x=0,y=0,width=0} = viewBox

   	return (
		<svg>
			<text x={width+90} y={y+5} fill='red' fontSize={12} textAnchor="middle">{yDangerousValue}</text>
		</svg>
	)
}
Chart.type = 'barChart'
export default  Chart
