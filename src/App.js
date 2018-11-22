import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import './App.css';

import MIndex from './components/index/Index';
import MIndex1 from './components/index/Index1';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={MIndex}/>
          <Route path="/index" component={MIndex1}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

