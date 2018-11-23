import React, { Component } from 'react';
import { Input, Button, notification, message, Modal, Form } from 'antd';

const FormItem = Form.Item;

export default class About extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	visible: false, 
	    	name: '' 
	    };
	}

	handleSubmit(e) {
		let _this = e;
		console.log(_this.target.tagName)
		notification.open({
		    message: '提交内容',
		    description: _this.target.tagName,
		    // duration: null,
		    onClose: (res)=>{
		    	message.success('成功关闭！');
		    }
		});
	}

	handelClick(e) {
		this.setState({
			'visible': true
		})
		console.log(e, 'e')
	}

	handleCancel() {
		this.setState({
			'visible': false
		})
		console.log('cancel');
	}

	handleOk() {
		this.setState({
			'visible': false
		})
		console.log('ok');
	}

	// 姓名
	handleChangeName(e) {
		let value = e.target.value;
		this.setState({
			'name': value
		})

		console.log(this.state.name, 'name');
	}

	render() {
		// const { getFieldDecorator } = this.props.form;

		const formItemLayout = {
			labelCol: {
				xs: { span: 24},
				sm: { span: 4},
			},
			wrapperCol: {
				xs: { span: 24},
				sm: { span: 20},
			},
		}
		return (
			<div>
				<h1>ABOUT</h1>
				<Input type="text"/>
				<Button onClick={this.handleSubmit}>提交</Button>
				<Button onClick={this.handelClick.bind(this)}>打开</Button>
				<Modal title="Basic Modal" visible={this.state.visible} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
					<Form>
						<FormItem {...formItemLayout} label="姓名" required>
							<Input onChange={this.handleChangeName.bind(this)} placeholder="请输入姓名" />
						</FormItem>	
						<FormItem {...formItemLayout} label="姓名" required>
							<Input placeholder="请输入姓名" />
						</FormItem>
						{/*<FormItem {...formItemLayout} label="密码" >
							{getFieldDecorator('password', {
								rules: [{
									required: true, message: 'Please input your password!',
								}, {
									validator: this.validateToNextPassword,
								}],
							})(
								<Input type="password" />
							)}
						</FormItem>*/}
					</Form>
		        </Modal>
			</div>
		);
	}
}