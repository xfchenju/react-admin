import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Layout, Menu, Icon, Button, Popconfirm, message  } from 'antd';
import './App.css';

import Home from '../Home/Home';
import UsersList from '../UsersList/UsersList';
import CategorysList from '../CategorysList/CategorysList';
import ArticlesList from '../ArticlesList/ArticlesList';
import ArticleCreate from '../ArticlesList/ArticleCreate';
//import Setting from '../Setting/Setting';
import ChangePwd from '../ChangePwd/ChangePwd';
import NoMatch from '../common/404';

import { logout } from '../../http/api'

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
    'name': '用户管理',
    'path': '/app/users-list',
    'icon': 'user'
  },
  {
    'key': 3,
    'name': '分类管理',
    'path': '/app/categorys-list',
    'icon': 'user'
  },
  {
    'key': 4,
    'name': '新建文章',
    'path': '/app/article-create',
    'icon': 'user'
  },
  {
    'key': 13,
    'name': '文章管理',
    'path': '/app/articles-list',
    'icon': 'user'
  },
  // {
  //   'key': 6,
  //   'name': '关于',
  //   'path': '/app/about',
  //   'icon': 'home',
  // },
  // {
  //   'key': 7,
  //   'name': '帮助',
  //   'path': '/app/help',
  //   'icon': 'home'
  // },
  {
    'key': 8,
    'name': '设置',
    'icon': 'setting',
    'children': [
      // {
      //   'key': 9,
      //   'name': '个人设置',
      //   'path': '/app/setting',
      //   'icon': 'user'
      // },
      {
        'key': 10,
        'name': '修改密码',
        'path': '/app/changePwd',
        'icon': 'lock'
      },
    ]
  }
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
        openKey: null,
        // 用户信息
        user: {}
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

  // 注销
  _logout = () => {
    logout().then((res)=>{
      let code = res.data.code;
      let msg = res.data.msg;
      if(code === 200) {
        localStorage.clear();
        message.success('注销成功!');
        setTimeout(()=>{
          this.props.history.push('/login');
        }, 300);
      }else {
        message.error(msg);
      }
    }).catch((err)=>{
      message.error('异常错误');
    })
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

  componentWillMount() {
    //获取用户信息
    let user = localStorage.getItem('user');
    if(user) {
      this.setState({
        user: JSON.parse(user)
      });
    }else {  
      this.props.history.push('/login');
    }
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
              <Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
              <div className="header__userContainer">
                <div className="header__userName">欢迎您，{this.state.user.username}</div>
                <div className="header__userAvatorWrap">
                  <img src="http://img2.touxiang.cn/file/20180306/1480df1654a971fd96385bb099cad7db.jpg" alt=""/>
                </div>
                <Popconfirm className="header__logout" title="您确定要注销吗？" onConfirm={this._logout} okText="是的" cancelText="取消" placement="bottomRight">
                  <Button >注销</Button>
                </Popconfirm>
              </div>
            </Header>
            <Content style={{ overflowY: 'auto'}}>
              <Switch> 
                <Route exact path="/app" component={Home}/>  
                <Route path="/app/users-list" component={UsersList}/>  
                <Route path="/app/categorys-list" component={CategorysList}/>  
                <Route path="/app/articles-list" component={ArticlesList}/>   
                <Route path="/app/article-create" component={ArticleCreate}/>   
                {/*<Route path="/app/setting" component={Setting}/>*/}
                <Route path="/app/changePwd" component={ChangePwd}/>
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
