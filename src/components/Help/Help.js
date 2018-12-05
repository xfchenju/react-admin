import React, { Component } from 'react';
import { Button } from 'antd';
import { getUsersList } from '../../http/api';

export default class Help extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	loading: false
	    }
	}
	componentWillMount() {
		this.getListData();
	}

	getListData = () => {
		let data = {};
		this.setState({
			loading: true
		})
		getUsersList(data).then((res)=>{
			this.setState({
				loading: false
			})
			if(res) {
				console.log(res, 'res');
			}
		}).catch(()=>{
			this.setState({
				loading: false
			})
		});
	}

	render() {
		return (
			<div>
				<Button onClick={this.getListData}>刷新</Button>
				<h1>HELP</h1>
			</div>
		);
	}
}