import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { getAccessToken, checkAuth, getUserId } from './helper';
class Upload extends Component {
  constructor() {
    super();
    this.fetchDocument = this.fetchDocument.bind(this);
    this.lockDocument = this.lockDocument.bind(this);
    this.unlockDocument = this.unlockDocument.bind(this);
    this.updateDocument = this.updateDocument.bind(this);
    this.createDocument = this.createDocument.bind(this);

    //this.serchPlatform = this.serchPlatform.bind(this);
  }
  state = {
    documentData: {},
    interval: '',
    isEditable: false,
  };
  componentDidMount() {
    if (!checkAuth()) {
      clearInterval(this.state.interval);
      this.props.history.push(`/`);
      return;
    }
    this.fetchDocument();
    let interval = window.setInterval(() => {
      this.fetchDocument();
    }, 3000);
    this.setState({ interval: interval });
  }

  fetchDocument(UploadName) {
    fetch('http://localhost:3003/api/v1/document', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': getAccessToken(),
      },
    })
      .then(data => {
        return data.json();
      })
      .then(myJson => {
        let isEditable = false;
        if (myJson.data) {
          if (
            (myJson.data.status === 'locked' &&
              myJson.data.lockedBy === getUserId()) ||
            myJson.data.status === 'unlocked'
          ) {
            isEditable = true;
            if(!myJson.data.status === 'unlocked')
                clearInterval(this.state.interval);
          }
        } else {
          this.createDocument();
        }
        this.setState({
          documentData: myJson.data,
          isEditable: isEditable,
        });
      })
      .catch(error => {
        alert('No able to process this request try again');
      });
  }

  lockDocument() {
    const documentId = this.state.documentData._id
      ? this.state.documentData._id
      : '';
    fetch(`http://localhost:3003/api/v1/document/lock/${documentId}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': getAccessToken(),
      },
    })
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        alert(error.msg);
      });
  }

  unlockDocument() {
    clearInterval(this.state.interval);
    let interval = window.setInterval(() => {
      this.fetchDocument();
    }, 3000);
    this.setState({ interval: interval });
    const documentId = this.state.documentData._id
      ? this.state.documentData._id
      : '';
    fetch(`http://localhost:3003/api/v1/document/unlock/${documentId}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': getAccessToken(),
      },
    })
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        alert(error.msg);
      });
  }

  updateDocument(event) {
    const documentId = this.state.documentData._id
      ? this.state.documentData._id
      : '';
    const value = event.currentTarget.value;
    fetch(`http://localhost:3003/api/v1/document/${documentId}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': getAccessToken(),
      },
      body: JSON.stringify({ text: value }),
    })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
        alert('Unable to update check your network connection');
      });
  }

  createDocument() {
    fetch(`http://localhost:3003/api/v1/document`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': getAccessToken(),
      },
    })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
        alert('Unable to update check your network connection');
      });
  }

  render() {
    const documentData = this.state.documentData ? this.state.documentData : {};
    return (
      <div className="App">
        <h1>This is the Document</h1>
        {this.state.isEditable && (
          <textArea
            onClick={this.lockDocument}
            onMouseOut={this.unlockDocument}
            onChange={this.updateDocument}
          >
            {documentData.text ? documentData.text : ''}
          </textArea>
        )}
        {!this.state.isEditable && (
          <textArea disabled>
            {documentData.text ? documentData.text : ''}
          </textArea>
        )}
      </div>
    );
  }
}

const TextArea = props => {
  return (
    <ul>
      <p>File Name :{props.data.fileName}</p>
      <p>Status :{props.data.status}</p>
      <p>Date :{props.data.createdAt}</p>
    </ul>
  );
};

export default Upload;
