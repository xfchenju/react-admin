import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Index1 extends Component {
	render() {
		return (
			<div>
				<Link to="/"><h3>返回主页</h3></Link>
				<h1>这是主页1</h1>
			</div>
		);
	}
}