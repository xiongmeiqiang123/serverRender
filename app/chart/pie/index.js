import React from 'react';
import PropTypes from 'prop-types'
import colors from '../../colors'
import {PieChart, Pie, Legend, Tooltip, Cell, Sector} from 'recharts'
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = (props) => {
    console.log(props,'props');
    const { cx, cy, midAngle, innerRadius, outerRadius, percent, index, fill, name, value, startAngle, endAngle} = props;
    const radius = innerRadius + (outerRadius - innerRadius) * 1.5;
    const x =  cx + radius * Math.cos(-midAngle * RADIAN);
    const y =  cy + radius * Math.sin(-midAngle * RADIAN);
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius  * 1.5) * cos;
    const sy = cy + (outerRadius  * 1.5) * sin;
    const mx = cx + (outerRadius) * cos;
    const my = cy + (outerRadius) * sin;
    const ex = 0;
    const ey = 0;
    return (
        <g>
            <path d={`M${sx},${sy}L${mx},${my}`} stroke={fill} fill="none"/>
            <text x={x} y={y} fill={fill} style={{fontSize:12}} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${name}(${value}):${(percent * 100).toFixed(0)}%`}
            </text>
        </g>
    );
};

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {title, data=[]} = this.props;
        return (
            <div style={{margin:'auto', textAlign: 'center'}}>
                <h3>{title}</h3>
                <PieChart

                    width={1000} height={800} style={{margin: 'auto'}}>
                    <Pie
                        labelLine={false}
                        label={renderCustomizedLabel}
                        data={data}
                        outerRadius={200}>
                        {
                          	data.map((entry, index) => <Cell stroke={0} fill={colors[index]}/>)
                         }
                 </Pie>
                </PieChart>
            </div>
        );
    }
}

Index.type = 'pie'
Index.propTypes = {};
