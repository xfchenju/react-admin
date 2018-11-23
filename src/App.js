import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import './App.css';

import Home from './components/Home/Home';
import Help from './components/Help/Help';
import About from './components/About/About';
import Table from './components/Table/Table';
import Form from './components/Form/Form';
import NoMatch from './components/common/404';

const { Header, Sider, Content, Footer } = Layout;

export default class App extends Component {
  constructor(props){
    console.log(props, 'props')
      super(props);
      const { collapsed }= props;
      this.state = {
          collapsed: false,
          selectedKey: ['2']
      }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  componentDidMount() {
    console.log(this.props, 'this.props');
    //this.setMenuOpen(this.props);

  }
  render() {
    return (
      <Router>
        <Layout id="components-layout-demo-custom-trigger">
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={this.state.selectedKey}>
              <Menu.Item key="1">
                <Link to="/home">
                  <Icon type="user" />
                  <span>首页</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/table">
                  <Icon type="table" />
                  <span>表格</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/form">
                  <Icon type="table" />
                  <span>表单</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/about">
                  <Icon type="video-camera" />
                  <span>关于</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/help">
                  <Icon type="upload" />
                  <span>帮助</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon className="trigger"  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
            </Header>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              <Switch> 
                <Route exact path="/" component={Home}/>  
                <Route path="/home" component={Home}/>  
                <Route path="/help" component={Help}/>  
                <Route path="/about" component={About}/>  
                <Route path="/table" component={Table}/>  
                <Route path="/form" component={Form}/>  
                <Route component={NoMatch}/> 
              </Switch>
            </Content>
            <Footer style={{background: '#fff', textAlign: 'center'}}>
              MSPA ©2018-2019 Created by Chenju
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}
