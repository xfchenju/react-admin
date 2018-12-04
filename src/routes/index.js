import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from '../components/App/App';
import Login from '../components/Login/Login';
import NoMatch from '../components/common/404';

class MRoute extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/app" component={App}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={App}></Route>
          <Route component={NoMatch}></Route>
        </Switch>
      </Router>
    );
  }
}

export default MRoute;