import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import './App.css';

import Home from '../Home/Home';
import Help from '../Help/Help';
import About from '../About/About';
import Table from '../Table/Table';
import Form from '../Form/Form';
import Setting from '../Setting/Setting';
import ChangePwd from '../ChangePwd/ChangePwd';
import Demo from '../Demo/Demo';
import NoMatch from '../common/404';

const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

// 路由数组
const routerArr = [
  {
    'key': 1,
    'name': '首页',
    'path': '/app',
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
    'icon': 'home',
    'children': [
      {
        'key': 5,
        'name': '帮助',
        'path': '/app/help',
        'icon': 'home'
      },
    ]
  },
  {
    'key': 6,
    'name': '设置',
    'icon': 'setting',
    'children': [
      {
        'key': 7,
        'name': '个人设置',
        'path': '/app/setting',
        'icon': 'user'
      },
      {
        'key': 8,
        'name': '修改密码',
        'path': '/app/changePwd',
        'icon': 'lock'
      },
    ]
  },
  {
    'key': 9,
    'name': '404',
    'path': '/app/404',
    'icon': 'smile'
  },
  {
    'key': 10,
    'name': 'demo',
    'path': '/app/demo',
    'icon': 'smile'
  },
]

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        // 导航栏是否隐藏
        collapsed: localStorage.getItem('menu-collapsed') === "true",
        // 导航栏选中的item
        selectedKey: [''],
        // 导航栏打开的栏目
        openKey: null
    }
  }
  // 导航栏的显示隐藏
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    }, function() {
      localStorage.setItem('menu-collapsed', this.state.collapsed);
    });
  }
  // 点击MenuItem时 改变Menu选中的selectedKeys
  changeMenu = (item) => {
    this.setState({
      'selectedKey': [String(item.key)]
    });
    localStorage.setItem('selected-key', [String(item.key)])
  }
  openMenu = (item) => {
    this.setState({
      'openKey': item
    });
    localStorage.setItem('open-key', item.join('|'));
  }
  componentDidMount() {
    // 当前路由
    // let thisRouter = this.props.location.pathname;
    // 当前路由对应的路由数组
    // let thisRouterArr = routerArr.find(n =>n.path === thisRouter);
    //console.log(thisRouterArr, 'thisRouterArr');
    // 如果在路由数组中找到对应路由 设置导航栏选中该路由的MenuItem
    // if(thisRouterArr) {
      
    // }
    this.setState({
      'selectedKey': localStorage.getItem('selected-key') ? [String(localStorage.getItem('selected-key'))] : [''],
      'openKey': localStorage.getItem('open-key') ? localStorage.getItem('open-key').split("|") : [''],
    });
    // 是否隐藏导航栏
    // if(localStorage.getItem('menu-collapsed') !== null) {
    //   localStorage.setItem('menu-collapsed', false)
    // }
  }
  render() {
    // 导航栏元素
    const MenuItems = routerArr.map(item => {
      if(item['children']){
        let innerMenu = item.children.map(citem => {
          return (
            <Menu.Item key={citem.key}>
              <Link to={citem.path}>
                <Icon type={citem.icon} />
                <span>{citem.name}</span>
              </Link>
            </Menu.Item>
          );
        })
        return (
          <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}>
            {innerMenu}
          </SubMenu>
        )
      }else {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.path}>
              <Icon type={item.icon} />
              <span>{item.name}</span>
            </Link>
          </Menu.Item>
        );
      }
    });

    return (
      <Router>
        <Layout id="components-layout-demo-custom-trigger">
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" selectedKeys={this.state.selectedKey} openKeys={this.state.openKey} onClick={this.changeMenu} onOpenChange={this.openMenu}> 
              {MenuItems}
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0}}>
              <Icon className="trigger"  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
            </Header>
            <Content style={{ overflowY: 'auto'}}>
              <Switch> 
                <Route exact path="/app" component={Home}/>  
                <Route path="/app/help" component={Help}/>  
                <Route path="/app/about" component={About}/>  
                <Route path="/app/table" component={Table}/>  
                <Route path="/app/form" component={Form}/>  
                <Route path="/app/setting" component={Setting}/>  
                <Route path="/app/changePwd" component={ChangePwd}/>  
                <Route path="/app/demo" component={Demo}/>  
                <Route component={NoMatch}/> 
              </Switch>
            </Content>
            {/*<Footer style={{background: '#fff', textAlign: 'center'}}>
              MSPA ©2018-2019 Created by Chenju
            </Footer>*/}
          </Layout>
        </Layout>
      </Router>
    );
  }
}
