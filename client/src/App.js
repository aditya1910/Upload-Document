import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import platform from './platform';
import upload from './upload';
import document from './document';
import Login from './login';
import search from './search';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route key="search" exact path="/" component={search} />
            <Route key="document" exact path="/document" component={document} />
            <Route key="upload" exact path="/uploadStatus" component={upload} />
            <Route key="login" exact path="/login" component={Login} />
            <Route
              key="search"
              path="/platform/:platform"
              component={platform}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
