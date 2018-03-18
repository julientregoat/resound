import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUploaderFileList, isUploading, isNotUploading } from '../../actions/siteActions'

import { Spin } from 'antd'
import NewReleaseForm from './NewReleaseForm'

const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'});


class NewReleasePage extends Component {

  uploadFiles = () => {

    let reader = new FileReader();
    reader.onloadend = () => {
      buffer = Buffer.from(reader.result)
      console.log(buffer)
      ipfs.files.add({content: buffer}, {progress: (poop)=>console.log(poop)}).then(console.log)
    }
    let buffer = reader.readAsArrayBuffer()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.isUploading()
  }

  setFileList = (e) => {
    this.props.setUploaderFileList(e.fileList)
  }

  render() {
    return (
      <Spin
        size="large"
        tip="Uploading release..."
        spinning={this.props.uploader.uploading}
      >
        <NewReleaseForm submit={this.handleSubmit} setFileList={this.setFileList}/>
      </Spin>
    );
  }

}

const mapStateToProps = state => ({
  contract: state.web3.contract,
  uploader: state.site.uploader
})

export default connect(mapStateToProps, { setUploaderFileList, isUploading, isNotUploading })(NewReleasePage);
