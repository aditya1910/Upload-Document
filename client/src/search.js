import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { getAccessToken, checkAuth } from './helper';
class Upload extends Component {
  constructor() {
    super();
    this.fetchSearchData = this.fetchSearchData.bind(this);
  }
  state = {
    searchResult: [],
    interval: '',
  };
  componentDidMount() {
  }

  fetchSearchData(event) {
    fetch(
      `http://localhost:3003/api/v1/user/search/${
        document.getElementById('logInUserName').value
      }`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    )
      .then(data => {
        if(data.status===200)
          return data.json();

        return [];
      })
      .then(myJson => {
        console.log(myJson);
        this.setState({
          searchResult: myJson,
        });
      })
      .catch(error => {
        
        alert('No able to process this request try again');
      });
  }

  render() {
    const searchResultArr = this.state.searchResult
      ? this.state.searchResult
      : [];
    const uploadObj = searchResultArr.map(element => {
      return <UploadStatus data={element} />;
    });

    return (
      <div className="App">
        <div id="login">
          <h1>Search user!</h1>
          <div>
            <input type="text" id="logInUserName" />
          </div>
          <button
            onClick={this.fetchSearchData}
            className="button button-block"
          >
            Search
          </button>
        </div>
        <p>{uploadObj}</p>
      </div>
    );
  }
}

const UploadStatus = props => {
  return (
    <ul>
      <p>
        Name :{props.data.firstName +
          ' ' +
          props.data.middleName +
          ' ' +
          props.data.lastName}
      </p>
    </ul>
  );
};

export default Upload;
