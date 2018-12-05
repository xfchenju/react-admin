import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';
import './login.css';
import { Layout, Icon, Form, Input, Button, message } from 'antd';
import { login } from '../../http/api'

const { Header, Content } = Layout;
const FormItem = Form.Item;



class Login extends Component {
	// 用户登录
	_login = (username, password) => {
		let data = {
			username: username,
			password: password
		}
		login(data).then((res)=>{
			console.log('res', res);
			let code = res.data.code;
			let msg = res.data.msg;
			if(code === 200) {
				let user = res.data.data.user;
				let token = res.data.data.token;
				localStorage.setItem("user", JSON.stringify(user));
				localStorage.setItem("token", token);
				message.success('登录成功！');
				setTimeout(()=>{
					this.props.history.push('/app');
				}, 300);
			}else {
				message.error(msg);
			}
		}).catch((err)=>{
			message.error('异常错误');
		})
	}
	// 登录按钮验证
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
				<Content style={{ margin: '0 auto', marginTop: 'calc((100vh - 500px) / 2)' }}>
					<Form className="login__container" onSubmit={this.handleSubmit}>
						<h2 style={{ color: '#999'}}>用户登录</h2>
						<FormItem>
							{getFieldDecorator('username', {
							  rules: [{ required: true, message: '请输入用户名!' }],
							})(
							  <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" autoComplete="off" />
							)}
						</FormItem>
						<FormItem>
							{getFieldDecorator('password', {
							  rules: [{ required: true, message: '请输入密码!' }],
							})(
							  <Input type="password" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="请输入密码" autoComplete="off" />
							)}
						</FormItem>
						<FormItem className="login__btnWrap">
							<Button htmlType="submit" className="login__btnWrap">登录</Button>
						</FormItem>
					</Form>
				</Content>
			</Layout>	
		);
	}
}

Login = Form.create()(Login);

export default Login;