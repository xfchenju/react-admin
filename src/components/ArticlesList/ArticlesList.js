import React, { Component } from 'react';
import { Button, Table, Pagination, Input, Form, message, Popconfirm, Modal } from 'antd';
import { getArticlesList, deleteArticle, getArticleDetail } from '../../http/api';
import moment from 'moment';
import './ArticlesList.css';
import ArticleModal from './articleModal'

const { Column } = Table;
const FormItem = Form.Item;

class ArticlesList extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	loading: false,
	    	// 列表数据
	    	list: [],
	    	// 搜索条件
	    	searchData: {
				title: '',
				author:''
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
			modalType: '',
			// 详情 弹窗状态
			detailStatus: false
	    }
	}

	componentWillMount() {
		this.getListData();
	}

	// 获取信息
	getListData = () => {
		let data = {
			title: this.state.searchData.title,
			author: this.state.searchData.author,
			fieldName: this.state.sortData.fieldName,
			sortRule: this.state.sortData.sortRule,
		};
		this.setState({
			loading: true
		})
		getArticlesList(data).then((res)=>{
			this.setState({
				loading: false
			})
			if(res) {
				this.setState({
					list: res.data.data.articles
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
				title: this.props.form.getFieldValue('searchTitle'),
				author: this.props.form.getFieldValue('searchAuthor'),
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
	handleEditArticle = (row) => {
		console.log('rowlist', row)
		// 重置表单 并且赋初值
		this.setState({
			editingData: {'id': row.id, 'title': row.title, 'content': row.content, 'categoryId': row.categoryId, 'isTop': row.isTop},
		}, function() {
			this.formRef.handleEdit();
			this.setState({
				modalStatus: true,
				modalType: 'edit'
			})
		});
	}

	// 打开新建分类窗口
	handleCreateArticle = () => {
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
	_deleteArticle = (id) => {
		let data = {
			id: id
		}
		deleteArticle(data).then((res)=>{
			if(res) {
				message.success('删除成功!');
				this.getListData();
			}
		});
	}

	// 查看详情
	handleViewDetail = (id) => {
		this.setState({
			detailStatus: true
		});
		this._getArticleDetail(id);
	}

	// 关闭详情的弹窗
	handleCancelViewDetail = () => {
		this.setState({
			detailStatus: false
		});
	}

	// 获取文章详情
	_getArticleDetail = (id) => {
		let data = {
			id: id
		}
		getArticleDetail(data).then((res)=>{
			let code = res.data.code;
			let msg = res.data.msg;
			if(code === 200) {
				this.setState({
					articleDetail: res.data.data.detail
				});
				console.log('data', res.data.data.detail);
			}else {
				message.error(msg);
			}
		})
	}

	render() {
		const { list, loading, total, dataPerPage, dataPage, editingData, modalType, modalStatus, detailStatus, articleDetail } = this.state;
		const { getFieldDecorator } = this.props.form;
		return (
			<div id="users" className="users">
				<div className="users__searchContainer" style={{ margin: '10px' }}>
					<Form layout="inline" onSubmit={this.handleSubmitSearch}>
						<FormItem label="文章标题">
							{getFieldDecorator('searchTitle')(
								<Input placeholder="请输入文章标题" autoComplete="off" />
							)}
						</FormItem>
						<FormItem label="作者">
							{getFieldDecorator('searchAuthor')(
								<Input placeholder="请输入作者" autoComplete="off" />
							)}
						</FormItem>
						<FormItem>
							<Button type="primary" icon="search" htmlType="submit">查询</Button>
						</FormItem>
						<FormItem>
							<Button type="primary" icon="plus" onClick={this.handleCreateArticle}>新建</Button>
						</FormItem>
					</Form>
				</div>
				<Table dataSource={list} rowKey="id" loading={loading} pagination={false} onChange={this.handleChangeTableSort}>
					<Column title="ID" dataIndex="id" key="id" />>
					<Column title="文章标题" dataIndex="title" key="title" />
					<Column title="作者" dataIndex="author" key="author" />
					<Column title="点击量" dataIndex="viewCount" key="view_count" sorter={true} />
					<Column title="分类名" dataIndex="category" key="category" />
					<Column title="是否置顶" dataIndex="isTop" key="is_top" 
						render={(isTop) => (
					        <span>{isTop ? '是' : '否'}</span>
					    )} />
					<Column title="文章状态" dataIndex="articleStatus" key="article_status" />
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
								<Button onClick={this.handleViewDetail.bind(this, record.id)} type="primary" size="small" icon="file-text">查看</Button>
								<Button style={{ marginLeft: '5px' }} onClick={this.handleEditArticle.bind(this, record)} type="primary" size="small" icon="edit">修改</Button>
								<Popconfirm title="您确定要删除吗？" onConfirm={this._deleteArticle.bind(this, record.id)} okText="是的" cancelText="取消" placement="bottomRight">
								  <Button style={{ marginLeft: '5px' }} type="danger" icon="delete" size="small">删除</Button>
								</Popconfirm>
							</span>
						)} />
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
				<ArticleModal 
					modalType={modalType} 
					modalStatus={modalStatus} 
					editingData={editingData} 
					wrappedComponentRef={(son)=> this.formRef = son}  
					handleChangeStatus={this.handleCancelModal.bind(this)} 
					getListData={this.getListData.bind(this)} />
				<Modal title="文章详情" visible={detailStatus} footer={null}
					onCancel={this.handleCancelViewDetail}>
					{articleDetail ? (
							<div>
								<span>标题：{articleDetail.title}</span><br/>
								<span>创建时间：{articleDetail.created_at}</span><br/>
								<span>分类名：{articleDetail.category}</span><br/>
								<span>是否置顶：{articleDetail.isTop ? '置顶' : '不置顶'}</span><br/>
								<span>点击数：{articleDetail.viewCount}</span><br/>
								<span>内容：{articleDetail.content}</span>
							</div>
						) : ''}
				</Modal>
			</div>
		);
	}
}

ArticlesList = Form.create({})(ArticlesList);
export default ArticlesList;