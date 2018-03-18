import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUploaderFileList, isUploading, isNotUploading, setArtworkPreview } from '../../actions/siteActions'

import { Spin, message } from 'antd'
import NewReleaseForm from './NewReleaseForm'

const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'});


class NewReleasePage extends Component {

  calculateUSD = (e) => {
    // console.log(e.target.value)
  }

  validatePrice = (rule, value, callback) => {
    isNaN(parseInt(value)) ? callback("Must be a number!") : callback()
  }

  getBase64(img) {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.props.setArtworkPreview(reader.result)
    }
    reader.readAsDataURL(img);
  }

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
    // only upload the last image!
    // or add a 'current photo' to state for previews
    // store images as base64 in IPFS
    e.preventDefault()
    this.props.isUploading()
    this.uploadFiles()
  }

  setFileList = (fileInfo) => {
    this.props.setUploaderFileList(fileInfo.fileList)
  }

  setImage = (fileInfo) => {
    console.log(fileInfo)
    this.getBase64(fileInfo.file)
  }

  render() {
    return (
      <Spin
        size="large"
        tip="Uploading release..."
        spinning={this.props.uploader.uploading}
      >
        <NewReleaseForm
          submit={this.handleSubmit}
          setFileList={this.setFileList}
          setImage={this.setImage}
          artworkPreview={this.props.uploader.artworkPreview}
          USDConversion={this.props.USDPrice}
          calculateUSD={this.calculateUSD}
          validatePrice={this.validatePrice}
          />
      </Spin>
    );
  }

}

const mapStateToProps = state => ({
  contract: state.web3.contract,
  uploader: state.site.uploader,
  USDPrice: state.site.USDPrice
})

export default connect(mapStateToProps, { setUploaderFileList, isUploading, isNotUploading, setArtworkPreview })(NewReleasePage);
