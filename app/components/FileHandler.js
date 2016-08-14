import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';

import * as actions from '../redux/actions';
import firebase from '../firebase';

function mapStatetoProps(state) {
  return { ...state.reducer };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}


const fileInput = document.getElementById('config-file');
fileInput.addEventListener('change', (e) => {
  let file = fileInput.files[0], textType = /text.*/;
  if (file.type.match(textType)) { const reader = new FileReader();
    reader.onload = (e) => { const config = JSON.parse(reader.result);
      if (this.validateConfigFile(config)) { this.save(config, 'Restored configuration from file');
        window.location.reload(); }
      else { this.status('Corrupted File.', 2000, 100, 'danger'); } };
    reader.readAsText(file); } else { this.status('Unsupported file format.', 2000, 100, 'danger'); } });
fileInput.click();

@connect(mapStatetoProps, mapDispatchToProps)
export default class Navigator extends React.Component {
  static propTypes = {
    geoSuccess: React.PropTypes.func,
    geoError: React.PropTypes.func,
    getNodes: React.PropTypes.func,
    location: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.storageRef = firebase.storage().ref();
  }
  onDrop = (files) => {
    const readFile = new FileReader();
    readFile.onload = (e) => {
      const contents = e.target.result;
      console.log(contents);
      // const uploadTask = storageRef.child('files/' + file.name).put(file);
    };
    readFile.readAsDataURL(files[0]);
  }
  render() {
    return (
      <div>
        <Dropzone ref="dropzone" onDrop={this.onDrop}>
          <div>Try dropping a file here, or click to upload.</div>
        </Dropzone>
      </div>
    );
  }
}