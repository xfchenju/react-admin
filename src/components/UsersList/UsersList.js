import React, { Component } from 'react';
import { Button, Table, Pagination, Input, Form, message } from 'antd';
//Modal, DatePicker, 
import { getUsersList } from '../../http/api';
import moment from 'moment';
import './UsersList.css';

import UserEditModal from './UserEditModal'


const { Column } = Table;
const FormItem = Form.Item;
class UsersList extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	loading: false,
	    	// 用户列表数据
	    	list: [],
	    	// 搜索条件
	    	searchData: {
	    		username: ''
	    	},
	    	// 排序规则
	    	sortData: {
	    		fieldName: '',
	    		sortRule: ''
	    	},
	    	// 总数
	    	total: 1,
	    	// 每页数量
	    	dataPerPage: 15,
	    	// 当前页码
	    	dataPage: 1,
	    	// 编辑用户弹窗状态
	    	editUserStatus: false,
	    	editingUserData: {},
	    	arr: []
	    }
	}

	componentWillMount() {
		this.getListData();
	}

	// 获取用户信息
	getListData = () => {
		let data = {
			username: this.state.searchData.username,
			fieldName: this.state.sortData.fieldName,
			sortRule: this.state.sortData.sortRule,
		};
		this.setState({
			loading: true
		})
		getUsersList(data).then((res)=>{
			this.setState({
				loading: false
			})
			if(res) {
				this.setState({
					list: res.data.data.users
				});
			}
		}).catch(()=>{
			this.setState({
				loading: false
			})
		});
	}

	// 页码切换
	handleChangePage = (page) => {
		this.setState({
			'dataPage': page
		}, function() {
			this.getListData();
		})
	}

	// 每页显示数量切换
	handleChangePageSize = (current, size) => {
		this.setState({
			'dataPage': 1,
			'dataPerPage': size
		}, function() {
			this.getListData();
		})
	}

	// 搜索
	handleSubmitSearch = (e) => {
		e.preventDefault();
		this.setState({
			dataPage: 1,
			searchData: {
				username: this.props.form.getFieldValue('searchUsername')
			}
		}, function() {
			this.getListData();
		});
	}

	// 打开编辑用户信息窗口
	handleEditUser = (row) => {

		// 重置表单 并且赋初值
		//this.props.form.resetFields();
		//this.props.form.setFieldsValue();
		this.setState({
			arr: [row.username],
			editingUserData: {'username': row.username, 'email': row.email,'phone_number': row.phoneNumber, 'realname': row.realname},
		}, function() {
			this.formRef.handleEditUser();
			this.setState({
				editUserStatus: true
			})
		});
	}

	// 取消编辑用户信息
	handleCancelEditUser = () => {
		this.setState({
			editUserStatus: false
		});
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
		this.setState({
			editUserStatus: false
		});
		this.getListData();
	}

	// 表格排序
	handleChangeTableSort = (pagination, filters, sorter) => {
		if(sorter) {
			this.setState({
				'sortData': {
					'fieldName': sorter.field,
					'sortRule': sorter.order === "ascend" ? 'asc' : 'desc',
				}
			}, function() {
				this.getListData();
			});
		}else {
			this.setState({
				'sortData': {
					'fieldName': '',
					'sortRule': '',
				}
			}, function() {
				this.getListData();
			});
		}
	}

	render() {
		const { list, loading, total, dataPerPage, dataPage, editUserStatus, editingUserData, arr } = this.state;
		const { getFieldDecorator } = this.props.form;
		// const formItemLayout = {
		// 	labelCol: {
		// 		xs: { span: 24},
		// 		sm: { span: 4},
		// 	},
		// 	wrapperCol: {
		// 		xs: { span: 24},
		// 		sm: { span: 20},
		// 	},
		// }

		return (
			<div id="users" className="users">
				<div className="users__searchContainer">
					<Form layout="inline" onSubmit={this.handleSubmitSearch}>
						<FormItem label="用户名">
							{getFieldDecorator('searchUsername')(
								<Input placeholder="请输入用户名" autoComplete="off" />
							)}
						</FormItem>
						{/*<FormItem label="用户创建日期">
							<RangePicker locale={locale} showTime format="YYYY-MM-DD HH:mm:ss" placeholder={['开始时间', '结束时间']}  onChange={this.handleChangeSearchDataCreatedAt} />
						</FormItem>*/}
						<FormItem>
							<Button type="primary" icon="search" htmlType="submit">查询</Button>
						</FormItem>
					</Form>
				</div>
				<Table dataSource={list} rowKey="id" loading={loading} pagination={false} onChange={this.handleChangeTableSort}>
					<Column title="ID" dataIndex="id" key="id"></Column>
					<Column title="头像" dataIndex="avator" key="avator"></Column>
					<Column title="用户名" dataIndex="username" key="username"></Column>
					<Column title="电子邮箱" dataIndex="email" key="email"></Column>
					<Column title="手机号码" dataIndex="phoneNumber" key="phone_number"></Column>
					<Column title="真实姓名" dataIndex="realname" key="realname"></Column>
					<Column title="用户状态" dataIndex="userStatus" key="user_status" 
						render={(user_status, record) => (
					        <span>{user_status}</span>
					    )}></Column>
					<Column title="是否管理员" dataIndex="isAdmin" key="is_admin" 
						render={(is_admin, record) => (
					        <span>{is_admin ? '是' : '否'}</span>
					    )}></Column>
					<Column title="最后登录时间" dataIndex="lastLogin" key="last_login" 
						render={(last_login, record) => (
					        <span>{moment(last_login).format('YYYY-MM-DD HH:mm:ss')}</span>
					    )}></Column>
					<Column title="创建时间" dataIndex="created_at" key="created_at" sorter={true} 
						render={(created_at, record) => (
					        <span>{moment(created_at).format('YYYY-MM-DD HH:mm:ss')}</span>
					    )} />
					<Column title="修改时间" dataIndex="updated_at" key="updated_at" 
						render={(updated_at, record) => (
					        <span>{moment(updated_at).format('YYYY-MM-DD HH:mm:ss')}</span>
					    )} />
					<Column title="操作" key="operation" 
						render={(text, record) => (
							<span>
								<Button onClick={this.handleEditUser.bind(this, record)} type="primary" icon="edit">修改</Button>
								<Button onClick={this.getListData} type="danger" icon="stop">禁用</Button>
							</span>
						)}></Column>
				</Table>
				<Pagination showQuickJumper showSizeChanger pageSizeOptions={['15', '30', '100', '200']} showTotal={total => `共 ${total} 条`} pageSize={dataPerPage} current={dataPage} total={total} onChange={this.handleChangePage} onShowSizeChange={this.handleChangePageSize} />
				<UserEditModal wrappedComponentRef={(editingUserData)=> this.formRef = editingUserData} editUserStatus={editUserStatus} editingUserData={editingUserData} arr={this.state.arr} handleChangeStatus={this.handleCancelEditUser.bind(this)} getListData={this.getListData.bind(this)}></UserEditModal>
				{/*<Modal title="修改用户信息" visible={editUserStatus} cancelText="取消" okText="确定"
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
				</Modal>*/}
			</div>
		);
	}
}
function mapPropsToFields(props) {
	console.log(props)
}
UsersList = Form.create({mapPropsToFields: mapPropsToFields()})(UsersList);
export default UsersList;