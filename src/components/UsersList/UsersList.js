import React, { Component } from 'react';
import { Button, Table, Pagination, Input, Form, message, Popconfirm } from 'antd';
import { getUsersList, deleteUser } from '../../http/api';
import moment from 'moment';
import './UsersList.css';
import UserModal from './userModal'

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
	    	// 修改用户信息时所传的数据
	    	editingUserData: {},
	    	// 用户弹窗状态
	    	modalStatus: false,
	    	// 弹窗的类型
	    	modalType: ''
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

	// 打开编辑用户信息窗口
	handleEditUser = (row) => {
		console.log('rowlist', row)
		// 重置表单 并且赋初值
		this.setState({
			editingUserData: {'id': row.id, 'avator': row.avator, 'username': row.username, 'email': row.email,'phone_number': row.phoneNumber, 'realname': row.realname, 'is_admin': row.isAdmin},
		}, function() {
			this.formRef.handleEditUser();
			this.setState({
				modalStatus: true,
				modalType: 'edit'
			})
		});
	}

	// 打开新建用户信息窗口
	handleCreateUser = () => {
		this.formRef.handleCreateUser();
		this.setState({
			modalStatus: true,
			modalType: 'create' 
		})
	}

	// 关闭弹出层
	handleCancelModal = () => {
		this.setState({
			modalStatus: false 
		})
	}

	// 删除用户
	_deleteUser = (id) => {
		let data = {
			id: id
		}
		deleteUser(data).then((res)=>{
			if(res) {
				message.success('删除成功!');
				this.getListData();
			}
		});
	}

	render() {
		const { list, loading, total, dataPerPage, dataPage, editingUserData, modalType, modalStatus } = this.state;
		const { getFieldDecorator } = this.props.form;
		return (
			<div id="users" className="users">
				<div className="users__searchContainer" style={{ margin: '10px' }}>
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
						<FormItem>
							<Button type="primary" icon="plus" onClick={this.handleCreateUser}>新建</Button>
						</FormItem>
					</Form>
				</div>
				<Table dataSource={list} rowKey="id" loading={loading} pagination={false} onChange={this.handleChangeTableSort}>
					<Column title="ID" dataIndex="id" key="id"></Column>
					<Column title="头像" dataIndex="avator" key="avator"
						render={(avator, record)=>(
							<div className="list-avator">
								<img src="http://img2.touxiang.cn/file/20180306/1480df1654a971fd96385bb099cad7db.jpg" key={record.id} alt="" />
							</div>
						)}></Column>
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
					        <span>{last_login ? moment(last_login).format('YYYY-MM-DD HH:mm:ss') : ''}</span>
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
								<Button onClick={this.handleEditUser.bind(this, record)} type="primary" size="small" icon="edit">修改</Button>
								<Popconfirm title="您确定要删除吗？" onConfirm={this._deleteUser.bind(this, record.id)} okText="是的" cancelText="取消" placement="bottomRight">
								  <Button style={{ marginLeft: '5px' }} type="danger" icon="delete" size="small">删除</Button>
								</Popconfirm>
							</span>
						)}></Column>
				</Table>
				<Pagination 
					showQuickJumper 
					showSizeChanger 
					pageSizeOptions={['15', '30', '100', '200']} 
					showTotal={total => `共 ${total} 条`} 
					pageSize={dataPerPage} 
					current={dataPage} 
					total={total} 
					onChange={this.handleChangePage} 
					onShowSizeChange={this.handleChangePageSize} />
				<UserModal 
					modalType={modalType} 
					modalStatus={modalStatus} 
					editingUserData={editingUserData} 
					wrappedComponentRef={(son)=> this.formRef = son}  
					handleChangeStatus={this.handleCancelModal.bind(this)} 
					getListData={this.getListData.bind(this)} />
			</div>
		);
	}
}

UsersList = Form.create({})(UsersList);
export default UsersList;