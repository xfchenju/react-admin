import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './login.css';
import { Layout, Icon, Form, Input, Button, message } from 'antd';
import { login } from '../../http/api'

const { Header, Content } = Layout;
const FormItem = Form.Item;



class Login extends Component {

	_login = (username, password) => {
		let data = {
			username: username,
			password: password
		}
		login(data).then((res)=>{
			message.seccess('登录成功');
			//return <Redirect to="/" />;
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				let { username, password } = values;
				this._login(username, password);
			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Layout style={{height: '100vh'}}>
				<Header style={{ background: '#fff', padding: 0}}></Header>
				<Content style={{ background: '#e7e7e7'}}>
					<Form className="login__container" onSubmit={this.handleSubmit}>
						<FormItem>
							{getFieldDecorator('username', {
							  rules: [{ required: true, message: '请输入用户名!' }],
							})(
							  <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" />
							)}
						</FormItem>
						<FormItem>
							{getFieldDecorator('password', {
							  rules: [{ required: true, message: '请输入密码!' }],
							})(
							  <Input type="password" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="请输入密码" />
							)}
						</FormItem>
						<FormItem class="login__btnWrap">
							<Button htmlType="submit">登录</Button>
						</FormItem>
					</Form>
				</Content>
			</Layout>	
		);
	}
}

Login = Form.create()(Login);

export default Login;