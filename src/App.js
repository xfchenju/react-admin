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

// 路由数组
const routerArr = [
  {
    'key': 1,
    'name': '首页',
    'path': '/app/home',
    'icon': 'home'
  },
  {
    'key': 2,
    'name': '表格',
    'path': '/app/table',
    'icon': 'table'
  },
  {
    'key': 3,
    'name': '表单',
    'path': '/app/form',
    'icon': 'form'
  },
  {
    'key': 4,
    'name': '关于',
    'path': '/app/about',
    'icon': 'home'
  },
  {
    'key': 5,
    'name': '帮助',
    'path': '/app/help',
    'icon': 'home'
  },
]

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        // 导航栏是否隐藏
        collapsed: localStorage.getItem('menu-collapsed') === "true",
        // 导航栏选中的item
        selectedKey: ['']
    }
  }
  // 导航栏的显示隐藏
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    }, function() {
      console.log(this.state.collapsed, 'this.state.collapsed');
      localStorage.setItem('menu-collapsed', this.state.collapsed);
    });
  }
  // 点击MenuItem时 改变Menu选中的selectedKeys
  changeMenu = (item) => {
    this.setState({
      'selectedKey': [String(item.keyPath)]
    });
  }
  componentDidMount() {
    // 当前路由
    let thisRouter = this.props.location.pathname;
    // 当前路由对应的路由数组
    let thisRouterArr = routerArr.find(n =>n.path === thisRouter);
    // 如果在路由数组中找到对应路由 设置导航栏选中该路由的MenuItem
    if(thisRouterArr) {
      this.setState({
        'selectedKey': [String(thisRouterArr.key)]
      });
    }
    // 是否隐藏导航栏
    // if(localStorage.getItem('menu-collapsed') !== null) {
    //   localStorage.setItem('menu-collapsed', false)
    // }
  }
  render() {
    // 导航栏元素
    const MenuItems = routerArr.map(item => {
      return (
        <Menu.Item key={item.key}>
          <Link to={item.path}>
            <Icon type={item.icon} />
            <span>{item.name}</span>
          </Link>
        </Menu.Item>
      );
    });

    return (
      <Router>
        <Layout id="components-layout-demo-custom-trigger">
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" selectedKeys={this.state.selectedKey} onClick={this.changeMenu}>
              {MenuItems}
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon className="trigger"  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
            </Header>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              <Switch> 
                <Route exact path="/app/home" component={Home}/>  
                <Route path="/app/help" component={Help}/>  
                <Route path="/app/about" component={About}/>  
                <Route path="/app/table" component={Table}/>  
                <Route path="/app/form" component={Form}/>  
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
