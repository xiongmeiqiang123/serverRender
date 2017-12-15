import React from 'react';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, Cell,ReferenceLine,ResponsiveContainer} from 'recharts'
import { Component } from 'react';
import colors from '../../colors'
import {Row, Col} from 'antd'
import './index.less'

class CustomLabel extends React.Component {
	constructor(props) {
		super(props);
	}

  format=(payload=[], dataKey)=>{
    const {format} = this.props;
    if(format) {
      return format(payload, dataKey)
    }

		return  payload[dataKey]
  }

	render(){
    const {viewBox={}, active, stroke, payload=[], dataKey,value=0,width} = this.props;
	const {x=0,y=0} = viewBox;

    return (
      <text x={x+width+20} y={y+18} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>
    )
  }
}

class Chart  extends React.Component{
	constructor(props) {
		super(props);
		this.state = {};
	}

	tickFormatter=(name='')=>{
		const {tickLen = 10} = this.props;
		return name.length >tickLen? name.slice(0,tickLen).replace(/ /g, '') + '...':name;
	}
	transformData(data=[]){
		return data.map((item)=>{
			item.time = Number(item.time);
			return item;
		})
	}


	render() {
		const {data=[], dataKey='index', showList=[],width,
		 x='value', y='index', xLabel, yLabel, name,dangerousValue,height} = this.props;

		let len = data.length;
		return (
		      <div style={{margin:'40px auto', width: '1200px', height: len * 60 + 20}} ref={chart => this.chart = chart} className='rankingChartComp'>

		        <h3 style={{textAlign:'center'}}>{this.props.title}</h3>

				<div style={{display: len ? '':'none'}}>

						<BarChart
			  			  data={data}
						  width={800}
						  height={len * 60 }
						  style={{margin:'auto', overflow: 'visible'}}
			  			  maxBarSize={38}
			  			  xLabel="s"
			  			  layout="vertical"
			  			  margin={{top: 5, right: 30, left: 20, bottom: 5}}
			  			>
			  			  <XAxis label={{value: xLabel, position: 'right' }}  scale={this.props.scale ||'sqrt'} domain={[0, dataMax=>dataMax*1.3]} type="number" orientation='top' dataKey={x}/>
			  			  <YAxis label={{value:yLabel, position: 'top' }}  padding={{ top: 10 }}  type="category" dataKey={y} />
			  			  <CartesianGrid strokeDasharray="3 3"/>

			  			  <Bar dataKey={x} name={name || x} label={<CustomLabel  dataKey={x}/>}>
			  			  	{
			  		  	      data.map((entry, index) => {
								return (
				  		  	        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
				  		  	      )
							  })
			  		  	    }
			  			  </Bar>
						  <ReferenceLine x={dangerousValue||undefined} stroke="red" isFront={true} strokeDasharray="3 3" strokeWidth='3'/>
			  			</BarChart>
				</div>
		      </div>
		);
	}
};
Chart.type = 'rankingChart'
export default Chart ;
