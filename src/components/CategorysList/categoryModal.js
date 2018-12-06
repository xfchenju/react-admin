import React, { Component } from 'react';
import { Modal, Form, Icon, Input, message, Popover } from 'antd';
import { createCategory, updateCategory } from '../../http/api';
const FormItem = Form.Item;

class UserEditModal extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	imageUrl: null,
	    	avator: null
	    }
	}

	// 打开编辑窗口
	handleEdit = () => {
		let row = this.props.editingData;
		// 重置表单 并且赋初值
		this.props.form.resetFields();
		this.props.form.setFieldsValue({'name': row.name, 'order': row.order});
	}

	// 打开创建窗口
	handleCreate = () => {
		// 初始化
		this.props.form.resetFields();
		this.setState({
			imageUrl: '',
			avator: ''
		})
	}

	// 取消编辑
	handleModalCancel = () => {
		this.props.handleChangeStatus(false);
	}

	// 提交
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				if(this.props.modalType === 'create') {
					this._createCategory();
				}else {
					this._updateCategory();
				}
			}
		});
	}

	// 修改 接口调用
	_updateCategory = () => {
		let data = this.props.form.getFieldsValue();
		Object.assign(data, {
			id: this.props.editingData.id
		});
		console.log(data, 'data-edit');
		updateCategory(data).then((res)=>{
			let code = res.data.code;
			let msg = res.data.msg;
			if(code === 200) {
				message.success('修改分类成功！');
				this.props.handleChangeStatus(false);
				this.props.getListData();
			}else {
				message.error(msg);
			}
		});
	}

	// 新建 接口调用
	_createCategory = () => {
		let data = this.props.form.getFieldsValue();
		console.log(data, 'data-create');
		createCategory(data).then((res)=>{
			let code = res.data.code;
			let msg = res.data.msg;
			if(code === 200) {
				message.success('新建分类成功！');
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

		const question =  (
			<Popover content="会根据数字大小升序排列，相同的数字会根据id升序排列，如不填会默认为0">
			    <Icon type="question-circle" />
			</Popover>
		);
		return (
			<Modal title={modalType === 'create' ? '新建分类' : '修改分类信息'} visible={modalStatus} cancelText="取消" okText="确定"
				onCancel={this.handleModalCancel} 
				onOk={this.handleSubmit}>
				<Form>
					<FormItem {...formItemLayout} label="分类名称：">
						{getFieldDecorator('name', {
							rules: [{ required: true, message: '请输入分类名称！' }],
						})(
							<Input prefix={<Icon type="copy" style={{ fontSize: 13 }} />} placeholder="请输入分类名称" autoComplete="off" />
						)}
					</FormItem>
					<FormItem {...formItemLayout} label="分类排序：">
						
						{getFieldDecorator('order')(
							<Input prefix={<Icon type="switcher" style={{ fontSize: 13 }} />} addonAfter={question} placeholder="请输入分类排序(数字)" autoComplete="off" />
						)}
					</FormItem>
				</Form>
			</Modal>
			
		);
	}
}

UserEditModal = Form.create()(UserEditModal);

export default UserEditModal;