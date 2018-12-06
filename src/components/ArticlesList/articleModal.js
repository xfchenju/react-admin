import React, { Component } from 'react';
import { Modal, Form, Icon, Input, message, Select, Switch } from 'antd';
import { createArticle, updateArticle, getActiveCategorys } from '../../http/api';
const FormItem = Form.Item;
const Option = Select.Option;

class UserEditModal extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	imageUrl: null,
			avator: null,
			categorysArr: []
	    }
	}

	// 打开编辑窗口
	handleEdit = () => {
		let row = this.props.editingData;
		// 重置表单 并且赋初值
		this.props.form.resetFields();
		this.props.form.setFieldsValue({'title': row.title, 'content': row.content, 'categoryId': row.categoryId, 'isTop': row.isTop});
		this._getActiveCategorys();
	}

	// 打开创建窗口
	handleCreate = () => {
		// 初始化
		this.props.form.resetFields();
		this._getActiveCategorys();
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
					this._createArticle();
				}else {
					this._updateArticle();
				}
			}
		});
	}

	// 修改 接口调用
	_updateArticle = () => {
		let data = this.props.form.getFieldsValue();
		Object.assign(data, {
			id: this.props.editingData.id
		});
		// 获取分类的名称
		let category = this.state.categorysArr.find(n => n.id === data.categoryId).name;
		Object.assign(data, {category: category});
		console.log(data, 'data-edit');
		updateArticle(data).then((res)=>{
			let code = res.data.code;
			let msg = res.data.msg;
			if(code === 200) {
				message.success('修改文章成功！');
				this.props.handleChangeStatus(false);
				this.props.getListData();
			}else {
				message.error(msg);
			}
		});
	}

	// 新建 接口调用
	_createArticle = () => {
		let data = this.props.form.getFieldsValue();
		// 获取分类的名称
		let category = this.state.categorysArr.find(n => n.id === data.categoryId).name;
		Object.assign(data, {category: category});
		createArticle(data).then((res)=>{
			let code = res.data.code;
			let msg = res.data.msg;
			if(code === 200) {
				message.success('新建文章成功！');
				this.props.handleChangeStatus(false);
				this.props.getListData();
			}else {
				message.error(msg);
			}
		});
	}

	// 获取已启用分类
	_getActiveCategorys = () => {
		getActiveCategorys().then((res)=>{
			let code = res.data.code;
			let msg = res.data.msg;
			if(code === 200) {
				this.setState({
					categorysArr: res.data.data.avtiveCategorys
				}, function() {
					if(this.state.categorysArr.length > 0) {
						if(!this.props.form.getFieldValue('categoryId')) {
							this.props.form.setFieldsValue({categoryId: this.state.categorysArr[0].id});
							console.log(this.props.form.categoryId, 'this.props.form.categoryId')
						}
					}
				})
			}else {
				message.error(msg);
			} 
		})
	}
	render() {
		const { categorysArr } = this.state;
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
			<Modal title={modalType === 'create' ? '新建文章' : '修改文章'} visible={modalStatus} cancelText="取消" okText="确定"
				onCancel={this.handleModalCancel} 
				onOk={this.handleSubmit}>
				<Form>
					<FormItem {...formItemLayout} label="文章标题：">
						{getFieldDecorator('title', {
							rules: [{ required: true, message: '请输入文章标题！' }],
						})(
							<Input prefix={<Icon type="copy" style={{ fontSize: 13 }} />} placeholder="请输入文章标题" autoComplete="off" />
						)}
					</FormItem>
					<FormItem {...formItemLayout} label="文章内容：">
						{getFieldDecorator('content', {
							rules: [{ required: true, message: '请输入文章内容！' }],
						})(
							<Input type="textarea" rows={4} prefix={<Icon type="copy" style={{ fontSize: 13 }} />} placeholder="请输入文章内容" autoComplete="off" />
						)}
					</FormItem>
					<FormItem {...formItemLayout} label="所属分类：">
						{getFieldDecorator('categoryId', {
							rules: [{ required: true, message: '请选择分类名称！' }],
						})(
							<Select>
								{
									categorysArr.map(item => {
										return <Option value={item.id} key={item.id} >{item.name}</Option>
									})
								}
							</Select>
						)}
					</FormItem>
					<FormItem {...formItemLayout} label="是否置顶：">
						{getFieldDecorator('isTop', { valuePropName: 'checked' })(
							<Switch />
						)}
					</FormItem>
				</Form>
			</Modal>
			
		);
	}
}

UserEditModal = Form.create()(UserEditModal);

export default UserEditModal;