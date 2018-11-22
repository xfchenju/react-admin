import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Index extends Component {
	render() {
		return (
			<div>
				<Link to="/index"><h3>去主页1</h3></Link>
				<h1>这是主页</h1>
			</div>
		);
	}
}