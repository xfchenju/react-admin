import React, { Component } from 'react';

export default class NoMatch extends Component {
	imgsFor404() {
		let rand = Math.random() * 10;
		if(rand > 8) {
			return (<img src={require('./404.jpg')} alt="404" style={{width: '600px' }} />);
		}else {
			return (<h1>404 No Find</h1>);
		}
	}

	render() {
		return (
			<div style={{textAlign: 'center', background: '#fff', width: '100%'}}>
				{this.imgsFor404()}
			</div>
		);
	}
}