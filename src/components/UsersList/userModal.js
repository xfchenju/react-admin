import React, { Component } from 'react';
import { Modal, Form, Icon, Input, message, Switch } from 'antd';
import { register } from '../../http/api';
const FormItem = Form.Item;

class UserEditModal extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    }
	}

	// 打开编辑用户信息窗口
	handleEditUser = () => {
		let row = this.props.editingUserData;
		// 重置表单 并且赋初值
		this.props.form.resetFields();
		this.props.form.setFieldsValue({'username': row.username, 'email': row.email,'phone_number': row.phoneNumber, 'realname': row.realname});
	}

	// 打开创建用户窗口
	handleCreateUser = () => {
		this.props.form.resetFields();
	}

	// 取消编辑用户信息
	handleModalCancel = () => {
		this.props.handleChangeStatus(false);
	}

	// 提交
	handleSubmitEditUser = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				if(this.props.modalType === 'create') {
					this._createUser();
				}else {
					this._editUser();
				}
			}
		});
	}

	// 修改用户信息 接口调用
	_editUser = () => {
		let data = this.props.form.getFieldsValue();
		console.log(data, 'data');
		message.success('修改用户信息成功！');
		setTimeout(()=>{
			this.handleModalCancel();
			this.props.getListData();
		}, 500);
	}

	// 新建用户 接口调用
	_createUser = () => {
		let data = this.props.form.getFieldsValue();
		console.log(data, 'data');
		register(data).then((res)=>{
			let code = res.data.code;
			let msg = res.data.msg;
			if(code === 200) {
				message.success('新建用户成功！');
				this.props.handleChangeStatus(false);
				this.props.getListData();
			}else {
				message.error(msg);
			}
		});
	}

	render() {
		const { modalStatus, modalType } = this.props;
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
			<Modal title={modalType === 'create' ? '新建用户' : '修改用户信息'} visible={modalStatus} cancelText="取消" okText="确定"
				onCancel={this.handleModalCancel} 
				onOk={this.handleSubmitEditUser}>
				<Form>
					<FormItem {...formItemLayout} label="用户名：">
						{getFieldDecorator('username', {
							rules: [{ required: true, message: '请输入用户名！' },
							{ pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/, message: '用户名只能使用数字字母下划线并以字母开头！' },
							{ max: 20, min: 2, message: '用户名长度在2-20位字符！'}],
						})(
							<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" autoComplete="off" />
						)}
					</FormItem>
					<FormItem {...formItemLayout} label="密码：">
						{getFieldDecorator('password', {
							rules: [{ required: true, message: '请输入密码！' }, 
							{ max: 16, min: 6, message: '密码长度在6-16位字符！'}],
						})(
							<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="请输入密码" autoComplete="off" />
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
						{getFieldDecorator('phoneNumber',{
							rules: [{ len: 11, message: '请输入11位手机号码！' }],
						})(
							<Input prefix={<Icon type="mobile" style={{ fontSize: 13 }} />} placeholder="请输入手机号码" autoComplete="off" />
						)}
					</FormItem>
					<FormItem {...formItemLayout} label="真实姓名：">
						{getFieldDecorator('realname')(
							<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入真实姓名(中文英文)" autoComplete="off" />
						)}
					</FormItem>
					<FormItem {...formItemLayout} label="是否管理员：">
						{getFieldDecorator('isAdmin', { valuePropName: 'checked' })(
							<Switch />
						)}
					</FormItem>
					{/*<FormItem {...formItemLayout} label="头像：">

						{getFieldDecorator('avator')(
							<Upload
						        className="avatar-uploader"
						        name="avatar"
						        showUploadList={false}
						        action="//jsonplaceholder.typicode.com/posts/"
						        beforeUpload={beforeUpload}
						        onChange={this.handleChange}
						      >
						        {
						          imageUrl ?
						            <img src={imageUrl} alt="" className="avatar" /> :
						            <Icon type="plus" className="avatar-uploader-trigger" />
						        }
						      </Upload>
						)}
					</FormItem>*/}
				</Form>
			</Modal>
			
		);
	}
}

UserEditModal = Form.create()(UserEditModal);

export default UserEditModal;