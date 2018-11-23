import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Home from '../components/Home/Home';
import About from '../components/About/About';
import Help from '../components/Help/Help';

const Index = () => <h2>首页</h2>;


class MRoute1 extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/index">Index</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/help">Help</Link></li>
            </ul>
          </nav>
          <Route exact path="/" component={Home}></Route>
          <Route path="/index" component={Index}></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/help" component={Help}></Route>
        </div>
      </Router>
    );
  }
}

export default MRoute1;