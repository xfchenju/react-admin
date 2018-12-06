import React, { Component } from 'react';
import { Button, Table, Pagination, Input, Form, message, Popconfirm, Select } from 'antd';
import { getCategorysList, deleteCategory, isEnableCategory } from '../../http/api';
import moment from 'moment';
import './ArticlesList.css';
import ArticleModal from './articleModal'

const { Column } = Table;
const FormItem = Form.Item;
const Option = Select.Option;

class CategorysList extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	loading: false,
	    	// 列表数据
	    	list: [],
	    	// 搜索条件
	    	searchData: {
	    		name: '',
	    		status: '',
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
	    	// 修改时所传的数据
	    	editingData: {},
	    	// 弹窗状态
	    	modalStatus: false,
	    	// 弹窗的类型
	    	modalType: ''
	    }
	}

	componentWillMount() {
		this.getListData();
	}

	// 获取信息
	getListData = () => {
		let data = {
			name: this.state.searchData.name,
			status: this.state.searchData.status,
			fieldName: this.state.sortData.fieldName,
			sortRule: this.state.sortData.sortRule,
		};
		this.setState({
			loading: true
		})
		getCategorysList(data).then((res)=>{
			this.setState({
				loading: false
			})
			if(res) {
				this.setState({
					list: res.data.data.categorys
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
		console.log(this.props.form.getFieldValue('searchStatus'), 'asd');
		this.setState({
			dataPage: 1,
			searchData: {
				name: this.props.form.getFieldValue('searchName'),
				status: this.props.form.getFieldValue('searchStatus')
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

	// 打开编辑分类窗口
	handleEditCategory = (row) => {
		console.log('rowlist', row)
		// 重置表单 并且赋初值
		this.setState({
			editingData: {'id': row.id, 'name': row.name, 'order': row.order},
		}, function() {
			this.formRef.handleEdit();
			this.setState({
				modalStatus: true,
				modalType: 'edit'
			})
		});
	}

	// 打开新建分类窗口
	handleCreateCategory = () => {
		this.formRef.handleCreate();
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

	// 删除分类
	_deleteCategory = (id) => {
		let data = {
			id: id
		}
		deleteCategory(data).then((res)=>{
			if(res) {
				message.success('删除成功!');
				this.getListData();
			}
		});
	}
	// 禁用/启用分类
	_isEnableCategory = (id, status) => {
		let data = {
			id: id,
			status: status
		}
		isEnableCategory(data).then((res)=>{
			if(res) {
				message.success('操作成功!');
				this.getListData();
			}
		});
	}

	render() {
		const { list, loading, total, dataPerPage, dataPage, editingData, modalType, modalStatus } = this.state;
		const { getFieldDecorator } = this.props.form;
		return (
			<div id="users" className="users">
				<div className="users__searchContainer" style={{ margin: '10px' }}>
					<Form layout="inline" onSubmit={this.handleSubmitSearch}>
						<FormItem label="分类名称">
							{getFieldDecorator('searchName')(
								<Input placeholder="请输入分类名称" autoComplete="off" />
							)}
						</FormItem>
						<FormItem label="状态">
							{getFieldDecorator('searchStatus')(
								<Select style={{ width: 120 }}>
									<Option value="">全部</Option>
									<Option value="0">已启用</Option>
									<Option value="1">已禁用</Option>
								</Select>
							)}
						</FormItem>
						<FormItem>
							<Button type="primary" icon="search" htmlType="submit">查询</Button>
						</FormItem>
						<FormItem>
							<Button type="primary" icon="plus" onClick={this.handleCreateCategory}>新建</Button>
						</FormItem>
					</Form>
				</div>
				<Table dataSource={list} rowKey="id" loading={loading} pagination={false} onChange={this.handleChangeTableSort}>
					<Column title="ID" dataIndex="id" key="id"></Column>
					<Column title="名称" dataIndex="name" key="name"></Column>
					<Column title="排序" dataIndex="order" key="order" sorter={true}></Column>
					<Column title="状态" dataIndex="status" key="status" 
						render={(status) => (
					        <span>{status === 0 ? '启用' : '禁用'}</span>
					    )} />
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
								<Button onClick={this.handleEditCategory.bind(this, record)} type="primary" size="small" icon="edit">修改</Button>
								{record.status === 0 ? (
									<Button style={{ marginLeft: '5px' }} onClick={this._isEnableCategory.bind(this, record.id, 1)} type="danger" size="small" icon="stop">禁用</Button>
								) : (
									<Button style={{ marginLeft: '5px' }} onClick={this._isEnableCategory.bind(this, record.id, 0)} type="primary" size="small" icon="play-circle-o">启用</Button>
								)}
								<Popconfirm title="您确定要删除吗？" onConfirm={this._deleteCategory.bind(this, record.id)} okText="是的" cancelText="取消" placement="bottomRight">
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
				<CategoryModal 
					modalType={modalType} 
					modalStatus={modalStatus} 
					editingData={editingData} 
					wrappedComponentRef={(son)=> this.formRef = son}  
					handleChangeStatus={this.handleCancelModal.bind(this)} 
					getListData={this.getListData.bind(this)} />
			</div>
		);
	}
}

CategorysList = Form.create({})(CategorysList);
export default CategorysList;