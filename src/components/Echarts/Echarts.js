import React, { Component } from 'react';
import echarts from 'echarts' //必须

export default class Echarts extends Component {
	constructor(props) {
	    super(props)
	    this.initPie = this.initPie.bind(this)
	}

	componentDidMount() {
		this.initPie()
	}

	componentDidUpdate() {
		this.initPie()
	}

	initPie() {
	    const { option={} } = this.props //外部传入的data数据

	    let myChart = echarts.init(this.ID) //初始化echarts

	    //设置options
	    myChart.setOption(option)
	    window.onresize = function() {
	      myChart.resize()
	    }
	}

	render() {
		return (
			<div style={{width: '100%', height: '300px'}}>
				<div ref={ID => this.ID = ID} style={{width: '100%', height: '300px'}}></div>
			</div>
		);
	}	
}