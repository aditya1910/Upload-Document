import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Platform extends Component {
  constructor() {
    super();
    this.downloadFile = this.downloadFile.bind(this);
    this.fetchUidRecords = this.fetchUidRecords.bind(this);
  }
  state = {
    platformName: '',
    totalUid: 0,
    uniqueUid: 0,
    sharedPercentage: 0,
  };
  componentDidMount() {
    const { platform } = this.props.match.params;
    this.setState({ platformName: platform });
    this.fetchUidRecords(platform);
  }

  fetchUidRecords(platformName) {
    fetch(`http://localhost:3003/api/v1/upload/${platformName}`)
      .then(data => {
        return data.json();
      })
      .then(myJson => {
        this.setState({
          totalUid: myJson.data.totalUid,
          uniqueUid: myJson.data.uniqueUid,
          sharedPercentage: myJson.data.sharedPercentage.toFixed(2),
        });
      })
      .catch(error => {
        alert('No able to process this request try again');
      });
  }

  downloadFile() {
    window.open(`http://localhost:3003/api/v1/upload/download`, '_blank');
  }

  render() {
    return (
      <div className="App">
        <h1>Displaying data for the {this.state.platformName} </h1>
        <p>Total UID:{this.state.totalUid}</p>
        <p>Total Unique UID:{this.state.uniqueUid}</p>
        <p>Total Share of UID:{this.state.sharedPercentage}</p>
        <button onClick={this.downloadFile}>Download</button>
      </div>
    );
  }
}

export default Platform;
