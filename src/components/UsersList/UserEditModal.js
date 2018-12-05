import React, { Component } from 'react';
import { Modal, Form, Icon, Input, message, Button } from 'antd';
const FormItem = Form.Item;

class UserEditModal extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    }
	}

	// 打开编辑用户信息窗口
	handleEditUser = () => {
		console.log('shiyong')
		let row = this.props.editingUserData;
		// 重置表单 并且赋初值
		this.props.form.resetFields();
		this.props.form.setFieldsValue({'username': row.username, 'email': row.email,'phone_number': row.phoneNumber, 'realname': row.realname});
	}

	clear = ()=>{
		this.props.form.resetFields();
	}
	// 取消编辑用户信息
	handleCancelEditUser = () => {
		this.props.handleChangeStatus(false);
	}

	// 提交修改用户信息
	handleSubmitEditUser = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this._editUser();
			}
		});
	}

	// 修改用户信息 接口调用
	_editUser = () => {
		let data = this.props.form.getFieldsValue();
		console.log(data, 'data');
		message.success('修改用户信息成功！');
		setTimeout(()=>{
			this.handleCancelEditUser();
			this.props.getListData();
		}, 500);
	}
	render() {
		const { editUserStatus } = this.props;
		const { getFieldDecorator } = this.props.form;
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
			<Modal title="修改用户信息" visible={editUserStatus} cancelText="取消" okText="确定"
				onCancel={this.handleCancelEditUser} 
				onOk={this.handleSubmitEditUser}>
				<Form>
					<FormItem {...formItemLayout} label="用户名：">
						{getFieldDecorator('username', {
							rules: [{ required: true, message: '请输入用户名！' }],
						})(
							<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" autoComplete="off" />
						)}
					</FormItem>
					<FormItem {...formItemLayout} label="电子邮箱：">
						{getFieldDecorator('email', {
							rules: [{ required: true, message: '请输入电子邮箱！' },
									{ type:'email', message: '请输入正确的电子邮箱！' }],
						})(
							<Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="请输入电子邮箱" autoComplete="off" />
						)}
					</FormItem>
					<FormItem {...formItemLayout} label="手机号码：">
						{getFieldDecorator('phoneNumber')(
							<Input prefix={<Icon type="mobile" style={{ fontSize: 13 }} />} placeholder="请输入手机号码" autoComplete="off" />
						)}
					</FormItem>
					<FormItem {...formItemLayout} label="真实姓名：">
						{getFieldDecorator('realname')(
							<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入真实姓名" autoComplete="off" />
						)}
					</FormItem>
				</Form>
			</Modal>
		);
	}
}

UserEditModal = Form.create()(UserEditModal);

export default UserEditModal;