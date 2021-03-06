import React, { Component } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

export default class MTable extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	visible: false, 
	    	name: '' 
	    };
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
	handleCancel() {
		this.setState({
			'visible': false
		})
		console.log('cancel');
	}

	// 修改表单姓名
	handleChangeName(e) {
		let value = e.target.value;
		this.setState({
			'name': value
		})
	}

	render() {
		const dataSource = [{
		  key: '1',
		  name: '胡彦斌',
		  age: 32,
		  address: '西湖区湖底公园1号',
		  op: 0
		}, {
		  key: '2',
		  name: '胡彦祖',
		  age: 42,
		  address: '西湖区湖底公园1号',
		  op: 1
		}];

		const columns = [{
		  title: '姓名',
		  dataIndex: 'name',
		  key: 'name',
		}, {
		  title: '年龄',
		  dataIndex: 'age',
		  key: 'age',
		}, {
		  title: '住址',
		  dataIndex: 'address',
		  key: 'address',
		}, {
		  title: '操作',
		  dataIndex: 'op',
		  key: 'op',
		  render: (id) => (
		  	<span>
		  		<Button type="primary" size="small" icon="edit" onClick={()=>this.onClick(id)}>修改</Button>
		  	</span>
		  )
		}];

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
			<div>
				<Table dataSource={dataSource} columns={columns} />
				<Modal title="Basic Modal" visible={this.state.visible} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
					<Form>
						<FormItem {...formItemLayout} label="姓名" required>
							<Input onChange={this.handleChangeName.bind(this)} placeholder="请输入姓名" />
						</FormItem>
					</Form>
		        </Modal>
			</div>
		);
	}
}