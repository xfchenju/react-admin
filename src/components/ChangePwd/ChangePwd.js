import React, { Component } from 'react';
import { Form, Icon, Input, Button, Message } from 'antd';

const FormItem = Form.Item;

class ChangePwd extends Component {
	handleSubmit = (e) => {
		console.log(e, 'e')
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			console.log(values, 'values')
			if(!err) {
				console.log('values of form: ', values);
				Message.success('提交成功!');
			}
		})
	}

	checkTwiceEnter = (rule, value, callback) => {
		let newPassword = value;
		let repeatNewPassword = this.props.form.getFieldValue('repeatNewPassword');
		let repeatNewPasswordError = this.props.form.getFieldError('repeatNewPassword');
		if(newPassword && repeatNewPassword && newPassword != repeatNewPassword) {
			callback('两次密码不一致');	
		}else {
			if(repeatNewPasswordError) {
				const errors = repeatNewPasswordError.filter(item => {
					if(item !== '两次密码不一致') {
						return item
					}
				})
				if(errors.length > 0) {
					this.props.form.setFields({'repeatNewPassword': {value: repeatNewPassword, errors: errors.map(item=>{return new Error(item)})}});
				}else {
					this.props.form.setFields({'repeatNewPassword': {value: repeatNewPassword, errors: null }});
				}
				
			}
		}
		callback();
	}

	checkTwiceEnterR = (rule, value, callback) => {
		let newPassword = this.props.form.getFieldValue('newPassword');
		let repeatNewPassword = value;
		let newPasswordError = this.props.form.getFieldError('newPassword');
		if(newPassword != repeatNewPassword) {
			callback('两次密码不一致');
		}else {
			if(newPasswordError) {
				const errors = newPasswordError.filter(item => {
					if(item !== '两次密码不一致') {
						return item
					}
				})
				if(errors.length > 0) {
					this.props.form.setFields({'newPassword': {value: newPassword, errors: errors.map(item=>{return new Error(item)})}});
				}else {
					this.props.form.setFields({'newPassword': {value: newPassword, errors: null }});
				}
				
			}
		}
		callback();
	}

	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			<div style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: '#fff' }}>
				<Form style={{width: 400}} onSubmit={this.handleSubmit}>
					<FormItem label="原密码">
						{getFieldDecorator('oldPassword', {
							rules: [{
								required: true, message: '请输入原密码',
							},{
								min: 6, max: 12, message: '密码长度在6-12个字符',
							}],
							})(
								<Input type="password" prefix={<Icon type="lock" />} placeholder="请输入原密码" />
							)
						}
					</FormItem>
					<FormItem label="新密码">
						{getFieldDecorator('newPassword', {
							rules: [{
								required: true, message: '请输入新密码',
							},{
								min: 6, max: 12, message: '密码长度在6-12个字符',
							},{ validator: this.checkTwiceEnter }],
							})(
								<Input type="password" prefix={<Icon type="lock" />} placeholder="请输入新密码" />
							)
						}
					</FormItem>
					<FormItem label="重复密码">
						{getFieldDecorator('repeatNewPassword', {
							rules: [{
								required: true, message: '请重复新密码',
							},{
								min: 6, max: 12, message: '密码长度在6-12个字符',
							},{ validator: this.checkTwiceEnterR }],
							})(
								<Input type="password" prefix={<Icon type="lock" />} placeholder="请重复新密码" />
							)
						}
					</FormItem>
					<FormItem>
						<Button type="primary" htmlType="submit">提交</Button>
					</FormItem>
				</Form>
			</div>
		);
	}
}

ChangePwd = Form.create()(ChangePwd);

export default ChangePwd;