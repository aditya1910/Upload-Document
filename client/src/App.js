import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import platform from './platform';
import upload from './upload';
import Login from './login';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route key="login" exact path="/" component={Login} />
            <Route key="upload" exact path="/uploadStatus" component={upload} />
            <Route key="search" path="/platform/:platform" component={platform} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
