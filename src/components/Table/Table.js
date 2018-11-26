import React, { Component } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, Pagination, Select } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
// import { Link } from 'react-router-dom';
import { getOrderList } from '../../http/api';

const FormItem = Form.Item;

const Option = Select.Option;

const { RangePicker } = DatePicker;

export default class MTable extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    	visible: false, 
	    	name: '',
	    	tableData: [],
	    	columns: [],
	    	loading: false,
	    	total: 0,
	    	dataPage: 1,
	    	dataPerPage: 15,
	    	viewLargeImageStatus: false, 
	    	viewLargeImageSrc: '',
	    	searchData: {
	    		'shopName': '',
	    		'orderNo': '',
	    		'status': '',
	    		'createdAt': ''
	    	},
	    	sortData: {
	    		'fieldName': '',
	    		'sortRule': ''
	    	},
	    	statusArr: {
	    		'1': '待发货',
	    		'2': '已取消',
	    		'3': '已发货',
	    		'4': '国内已揽件',
	    		'5': '国内在途中',
	    		'6': '国内问题件',
	    		'7': '国内已签收',
	    		'8': '国内收货',
	    		'9': '国内收货异常',
	    		'10': '国内截留订单',
	    		'11': '境外已揽件',
	    		'12': '境外配送中',
	    		'13': '境外配送成功',
	    		'14': '境外配送失败',
	    		'15': '境外异常订单',
	    	}
	    };
	}

	componentWillMount() {
		this.renderTableColumns();
		this.getListData();
	}

	getListData = () => {
		let data = {
			page: this.state.dataPage,
			per_page: this.state.dataPerPage,
			fieldName: this.state.sortData.fieldName,
			sortRule: this.state.sortData.sortRule,
			shop_name: this.state.searchData.shopName,
			item_main_oid: this.state.searchData.orderNo,
			status: this.state.searchData.status,
			create_at: this.state.searchData.createdAt,
		};
		this.setState({
			loading: true
		})
		getOrderList(data).then((res)=>{
			this.setState({
				loading: false
			})
			if(res) {
				let dataSource = res.data.data.orders.data;
				this.setState({
					tableData: dataSource,
					total: Number(res.data.data.orders.total),
					dataPerPage: Number(res.data.data.orders.per_page),
					dataPage: Number(res.data.data.orders.current_page),
				});
			}
		}).catch(()=>{
			this.setState({
				loading: false
			})
		});
	}

	renderTableColumns = () => {
		const columns = [{
		  title: '店铺名',
		  dataIndex: 'shop_name',
		  key: 'shop_name',
		}, {
		  title: '订单号',
		  dataIndex: 'item_oid',
		  key: 'item_oid',
		}, {
		  title: 'SPU',
		  dataIndex: 'sku_spu',
		  key: 'sku_spu',
		}, {
		  title: '图片',
		  dataIndex: 'sku_image',
		  key: 'sku_image',
		  render: (img) => (
		  	<img src={img} alt="" width="100" height="100" onClick={this.handleViewLargeImage.bind(this, img)} style={{cursor: 'pointer'}} />
		  )
		}, {
		  title: '订单状态',
		  dataIndex: 'status_zh',
		  key: 'status',
		}, {
		  title: '订单生成日期',
		  dataIndex: 'created_at',
		  key: 'created_at',
		  sorter: true
		}, {
		  title: '操作',
		  dataIndex: 'order_id',
		  key: 'order_id',
		  render: (id) => (
		  	<span>
		  		<Button type="primary" size="small" icon="edit" onClick={this.onClick.bind(this, id)}>修改</Button>
		  	</span>
		  )
		}];
		this.setState({
			columns: columns
		});
	}

	// 搜索
	handleSearch = () => {
		this.setState({
			dataPage: 1
		}, function() {
			this.getListData();
		});
	}

	// 查看大图
	handleViewLargeImage = (img) => {
		this.setState({
			viewLargeImageStatus: true,
			viewLargeImageSrc: img
		})

	}

	// 查看原图
	handleViewSourceImage = () => {
		window.open(this.state.viewLargeImageSrc);
	}

	onClick = (id) => {
		this.setState({
			'visible': true
		})
		console.log(id, 'id');
	}
	
	// 提交表单
	handleOk() {
		this.setState({
			'visible': false
		})
		console.log('ok');
	}

	// 取消表单
	handleCancel = (type) => {
		if(type === 1) {
			this.setState({
				'visible': false
			})
		}else if(type === 2) {
			this.setState({
				'viewLargeImageStatus': false
			})
		}
	}

	// 修改表单姓名
	handleChangeName(e) {
		let value = e.target.value;
		this.setState({
			'name': value
		})
	}

	handleChangeSearchDataShopName = (e) => {
		this.setState({
			'searchData': {
				'shopName': e.target.value
			}
		})
	}

	handleChangeSearchDataOrderNo = (e) => {
		this.setState({
			'searchData': {
				'orderNo': e.target.value
			}
		})
	}

	handleChangeSearchDataCreatedAt = (data, dataString) => {
		this.setState({
			'searchData': {
				'createdAt': (data && data.length > 0) ? dataString.join(" - ") : ''
			}
		})
	}

	handleChangeSearchDataOrderStatus = (value) => {
		this.setState({
			'searchData': {
				'status': value
			}
		})
	}

	handleChangePage = (page) => {
		this.setState({
			'dataPage': page
		}, function() {
			this.getListData();
		})
	}

	handleChangePageSize = (current, size) => {
		this.setState({
			'dataPage': 1,
			'dataPerPage': size
		}, function() {
			this.getListData();
		})
	}

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

	orderStatusOptions()  {
		let options = [];
		for(let i in this.state.statusArr) {
			options.push(<Option value={i} key={i}>{this.state.statusArr[i]}</Option>)
		}
		return options
	}

	render() {
		const { tableData, columns, loading, dataPerPage, dataPage, total, statusArr } = this.state;		

		const formItemLayout = {
			labelCol: {
				xs: { span: 24},
				sm: { span: 6},
			},
			wrapperCol: {
				xs: { span: 24},
				sm: { span: 18},
			},
		}
		return (
			<div className="tablePage" style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: '#fff' }}>
				<div className="tablePage__searchContainer" style={{ marginBottom: 10 }}>
					<Form layout="inline">
						<FormItem label="店铺名">
							<Input placeholder="请输入店铺名" onChange={this.handleChangeSearchDataShopName} />
						</FormItem>
						<FormItem label="订单号">
							<Input placeholder="请输入订单号" onChange={this.handleChangeSearchDataOrderNo} />
						</FormItem>
						<FormItem label="订单状态">
							<Select placeholder="请选择订单状态" onChange={this.handleChangeSearchDataOrderStatus} allowClear style={{width: 150}}>
								{this.orderStatusOptions()}
							</Select>
						</FormItem>
						<FormItem label="订单生成日期">
							<RangePicker locale={locale} showTime format="YYYY-MM-DD HH:mm:ss" placeholder={['开始时间', '结束时间']}  onChange={this.handleChangeSearchDataCreatedAt} />
						</FormItem>
						<FormItem>
							<Button type="primary" icon="search" onClick={this.handleSearch}>搜索</Button>
						</FormItem>
					</Form>
				</div>
				<Table pagination={false} loading={loading} rowKey="order_id" dataSource={tableData} columns={columns} onChange={this.handleChangeTableSort} />
				<Pagination showQuickJumper showSizeChanger pageSizeOptions={['15', '30', '100', '200']} showTotal={total => `共 ${total} 条`} pageSize={dataPerPage} current={dataPage} total={total} onChange={this.handleChangePage} onShowSizeChange={this.handleChangePageSize} />
				<Modal title="Basic Modal" visible={this.state.visible} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this, 1)}>
					<Form>
						<FormItem {...formItemLayout} label="店铺名" required>
							<Input onChange={this.handleChangeName.bind(this)} placeholder="请输入店铺名" />
						</FormItem>
						<FormItem {...formItemLayout} label="订单号" required>
							<Input onChange={this.handleChangeName.bind(this)} placeholder="请输入订单号" />
						</FormItem>
						<FormItem {...formItemLayout} label="SPU" required>
							<Input onChange={this.handleChangeName.bind(this)} placeholder="请输入订单号" />
						</FormItem>
						<FormItem {...formItemLayout} label="图片" required>
							<img alt="" width="100" height="100" />
						</FormItem>
						<FormItem {...formItemLayout} label="订单状态" required>
							<Select placeholder="请选择订单状态" onChange={this.handleChangeSearchDataOrderStatus} allowClear style={{width: '100%'}}>
								{this.orderStatusOptions()}
							</Select>
						</FormItem>
						<FormItem {...formItemLayout} label="订单生成日期" required>
							<DatePicker locale={locale} showTime format="YYYY-MM-DD HH:mm:ss" style={{width: '100%'}} />
						</FormItem>
					</Form>
		        </Modal>
        		<Modal title="查看大图" visible={this.state.viewLargeImageStatus} onCancel={this.handleCancel.bind(this, 2)}  width={1000} style={{textAlign: 'center'}} okText="查看原图" cancelText="关闭" onOk={this.handleViewSourceImage.bind(this)} centered >
        			<img src={this.state.viewLargeImageSrc} alt="" style={{height: '60vh' }} />
                </Modal>
			</div>
		);
	}
}