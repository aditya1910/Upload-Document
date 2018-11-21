import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Upload extends Component {
  constructor() {
    super();
    this.fetchUploadStatus = this.fetchUploadStatus.bind(this);
    this.serchPlatform = this.serchPlatform.bind(this);
  }
  state = {
    uploadStatusArr: [],
    interval:''
  };
  componentDidMount() {
    this.fetchUploadStatus()
    let interval = window.setInterval(() => {
      this.fetchUploadStatus();
    }, 3000);
    this.setState({interval:interval})
  }

  fetchUploadStatus(UploadName) {
    clearInterval(this.state.interval)
    fetch(`http://localhost:3003/api/v1/upload/status`)
      .then(data => {
        return data.json();
      })
      .then(myJson => {
        this.setState({
          uploadStatusArr: myJson.data,
        });
      })
      .catch(error => {
        alert('No able to process this request try again');
      });
  }

  serchPlatform(event) {
    this.props.history.push(`/platform/${event.currentTarget.value}`);
  }

  render() {
    const uploadObj = this.state.uploadStatusArr.map(element => {
      return <UploadStatus data={element} />;
    });

    return (
      <div className="App">
        <h1>This is your upload status</h1>
        <p>{uploadObj}</p>
        <form
          id="uploadForm"
          enctype="multipart/form-data"
          action="http://localhost:3003/api/v1/upload"
          method="post"
        >
          <input type="file" name="csvFile" />
          <input
            className="button button5"
            type="submit"
            value="upload"
            name="submit"
          />
        </form>
        Get the Use records for the selected field
        <select
          onChange={this.serchPlatform}
          className="button button1"
          name="Select"
          id="select"
        >
          <option>select</option>
          <option>android</option>
          <option>platform</option>
          <option>site</option>
          <option>widget</option>
          <option>wap</option>
          <option>g1box</option>
          <option>j2me</option>
          <option>iphone</option>
          <option>chrome</option>
          <option>web</option>
        </select>
      </div>
    );
  }
}

const UploadStatus = props => {
  return (
    <ul>
      <p>File Name :{props.data.fileName}</p>
      <p>Status :{props.data.status}</p>
      <p>Date :{props.data.createdAt}</p>
    </ul>
  );
};

export default Upload;
