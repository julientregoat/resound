import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUploaderFileList, isUploading, isNotUploading } from '../../actions/siteActions'

import { Spin, message } from 'antd'
import NewReleaseForm from './NewReleaseForm'

const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'});


class NewReleasePage extends Component {

  uploadFiles = () => {
    let fileCount = this.props.uploader.files.length;

    for(let i=0; i < fileCount; i++){
      let reader = new FileReader();

      reader.onloadend = () => {
        buffer = Buffer.from(reader.result)
        ipfs.files.add({content: buffer}).then(res => {
          console.log(res)
          message.success((i + 1) + " of "+ fileCount + " files uploaded")
        })
      }

      let buffer = reader.readAsArrayBuffer(this.props.uploader.files[i])
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.isUploading()
    this.uploadFiles()
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
