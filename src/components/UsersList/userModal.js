import React, { Component } from 'react';
import { Modal, Form, Icon, Input, message, Switch, Upload } from 'antd';
import { register, editUser } from '../../http/api';
const FormItem = Form.Item;


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);

  console.log('reader', reader);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

class UserEditModal extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	imageUrl: null,
	    	avator: null
	    }
	}

	// 打开编辑用户信息窗口
	handleEditUser = () => {
		let row = this.props.editingUserData;
		console.log(row, 'row')
		// 重置表单 并且赋初值
		this.props.form.resetFields();
		this.setState({
			imageUrl: row.avator,
			avator: row.avator
		})
		this.props.form.setFieldsValue({'username': row.username, 'email': row.email,'phoneNumber': row.phone_number, 'realname': row.realname, 'isAdmin': (row.is_admin ? true : false)});
	}

	// 打开创建用户窗口
	handleCreateUser = () => {
		// 初始化
		this.props.form.resetFields();
		this.setState({
			imageUrl: '',
			avator: ''
		})
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
		Object.assign(data, {
			id: this.props.editingUserData.id
		});
		// 头像
		let avator = data.upload ? data.upload[0].response.data.src : this.state.avator;
		Object.assign(data, {
			avator: avator
		});
		editUser(data).then((res)=>{
			let code = res.data.code;
			let msg = res.data.msg;
			if(code === 200) {
				message.success('修改用户信息成功！');
				this.props.handleChangeStatus(false);
				this.props.getListData();
			}else {
				message.error(msg);
			}
		});
	}

	// 新建用户 接口调用
	_createUser = () => {
		let data = this.props.form.getFieldsValue();
		if(this.state.avator) {
			Object.assign(data, {avator: this.state.avator});
		}
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

	// 图片上传完成 
	handleChange = (info) => {
	  if (info.file.status === 'done') {
	    console.log(info.file)
	    // Get this url from response in real world.
	    getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
	    this.setState({
	    	avator: info.file.response.data.src
	    })
	  }
	}

	// 图片上传验证
	normFile = (e) => {
	    console.log('Upload event:', e);
	    if (Array.isArray(e)) {
	      return e;
	    }
	    return e && e.fileList;
	}

	render() {
		const { imageUrl } = this.state;
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
							<Input disabled={modalType === 'create' ? false : true} prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" autoComplete="off" />
						)}
					</FormItem>
					{modalType === 'create' ? 
						(<FormItem {...formItemLayout} label="密码：">
							{getFieldDecorator('password', {
								rules: [{ required: true, message: '请输入密码！' }, 
								{ max: 16, min: 6, message: '密码长度在6-16位字符！'}],
							})(
								<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="请输入密码" autoComplete="off" />
							)}
						</FormItem>) : ''}
					<FormItem {...formItemLayout} label="电子邮箱：">
						{getFieldDecorator('email', {
							rules: [{ required: true, message: '请输入电子邮箱！' },
							{ type:'email', message: '请输入正确的电子邮箱！' }],
						})(
							<Input disabled={modalType === 'create' ? false : true} prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="请输入电子邮箱" autoComplete="off" />
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
					<FormItem {...formItemLayout} label="头像：">
						{getFieldDecorator('upload', {
				            valuePropName: 'fileList',
				            getValueFromEvent: this.normFile,
						})(
							<Upload
							  className="avator-uploader"
							  name="file"
							  showUploadList={false}
							  action="http://localhost:3002/api/v1/currency/upload"
							  beforeUpload={beforeUpload}
							  onChange={this.handleChange}
							>
							  {
							    imageUrl ?
							      <img src={imageUrl} alt="" className="avator" /> :
							      <Icon type="plus" className="avator-uploader-trigger" />
							  }
							</Upload>
						)}
						{/*<Upload
						  className="avator-uploader"
						  name="file"
						  showUploadList={false}
						  action="http://localhost:3002/api/v1/currency/upload"
						  beforeUpload={beforeUpload}
						  onChange={this.handleChange}
						>
						  {
						    imageUrl ?
						      <img src={imageUrl} alt="" className="avator" /> :
						      <Icon type="plus" className="avator-uploader-trigger" />
						  }
						</Upload>*/}
					</FormItem>
				</Form>
			</Modal>
			
		);
	}
}

UserEditModal = Form.create()(UserEditModal);

export default UserEditModal;