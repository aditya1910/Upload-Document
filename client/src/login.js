import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import _ from 'underscore';
import { setAuth, checkAuth } from './helper';
//import moment from "moment";

class Login extends Component {
  constructor() {
    super();
    this.changePage = this.changePage.bind(this);
    this.doLogin = this.doLogin.bind(this);
    this.doSignUp = this.doSignUp.bind(this);
    this.state = { pageType: 'login' };
  }
  componentDidMount() {
    if (checkAuth()) this.props.history.push(`/uploadStatus`);
  }
  changePage(pageType) {
    this.setState({ pageType: pageType });
  }
  doLogin() {
    const userName = document.getElementById('logInUserName').value;
    const password = document.getElementById('logPassword').value;
    console.log(userName, password);
    if (!userName || !password) alert('enter a valid userName and password');

    fetch(`http://localhost:3003/api/v1/app/login`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: userName,
        password: password,
      }),
    })
      .then(bookingData => {
        if (bookingData.status === 200) {
          return bookingData.json();
        } else alert('Wrong Email password');
      })
      .then(myJson => {
        const userName = myJson.user.userName;
        setAuth(myJson);
        this.props.history.push(`/uploadStatus`);
      })
      .catch(error => {
        console.log(error);
        alert('Wrong Email password');
      });
  }
  doSignUp() {
    const userName = document.getElementById('resUserName').value;
    const password = document.getElementById('resPassword').value;
    const email = document.getElementById('resEmail').value;
    if (!userName || !password || !email)
      alert('enter a valid userName and password and email');

    fetch(`http://localhost:3003/api/v1/app/signup`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: userName,
        password: password,
        email: email,
      }),
    })
      .then(bookingData => {
        if (bookingData.status === 201) {
          alert('signed-up successfully');
        } else alert('Something went wrong');
      })
      .catch(error => {
        console.log(error);
        alert('Something went wrong');
      });
  }

  render() {
    return (
      <div className="form">
        <button
          className="button button5"
          onClick={() => this.changePage('login')}
        >
          Login
        </button>
        <button
          className="button button5"
          onClick={() => this.changePage('signup')}
        >
          Siginup
        </button>
        {this.state.pageType === 'signup' && (
          <div id="signup">
            <h1>Sign Up for Free</h1>
            <div className="top-row">
              <div>
                <label>
                  User Name<span className="req">*</span>
                </label>
                <input
                  type="text"
                  id="resUserName"
                  required
                  autocomplete="off"
                />
              </div>
            </div>
            <div>
              <label>
                Email Address<span className="req">*</span>
              </label>
              <input type="email" id="resEmail" required autocomplete="off" />
            </div>
            <div>
              <label>
                Set A Password<span className="req">*</span>
              </label>
              <input
                type="password"
                id="resPassword"
                required
                autocomplete="off"
              />
            </div>
            <button
              type="submit"
              onClick={this.doSignUp}
              className="button button-block"
            >
              Get Started
            </button>
          </div>
        )}
        {this.state.pageType === 'login' && (
          <div id="login">
            <h1>Welcome Back!</h1>
            <div>
              <label>
                User Name<span className="req">*</span>
              </label>
              <input
                type="text"
                id="logInUserName"
                required
                autocomplete="off"
              />
            </div>
            <div>
              <label>
                Password<span className="req">*</span>
              </label>
              <input
                type="password"
                id="logPassword"
                required
                autocomplete="off"
              />
            </div>
            <button onClick={this.doLogin} className="button button-block">
              Log In
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
