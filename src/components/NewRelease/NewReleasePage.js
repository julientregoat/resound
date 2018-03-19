import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUploaderFileList,
         isUploading,
         isNotUploading,
         setArtworkPreview,
         setUSDConversion } from '../../actions/siteActions'

import { Spin, message } from 'antd'
import NewReleaseForm from './NewReleaseForm'

const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'});


class NewReleasePage extends Component {

  calculateUSD = (e) => {
    this.props.setUSDConversion(e.target.value * this.props.USDPrice)
  }

  validatePrice = (rule, value, callback) => {
    isNaN(parseInt(value, 10)) ? callback("Must be a number!") : callback()
  }

  getBase64(img) {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.props.setArtworkPreview(reader.result)
    }
    reader.readAsDataURL(img);
  }

  upload = (release_title) => {
    // upload images here as well
    let fileCount = this.props.uploader.files.length;
    let files = [];
    ipfs.files.mkdir('/' + release_title)
    // can refactor with forEach?
    for(let i=0; i < fileCount; i++){
      let reader = new FileReader();
      let file = this.props.uploader.files[i]
      // might need to get DIR path first before uploading files?
      let path = "/" + release_title + "/" + file.name

      reader.onloadend = () => {
        buffer = Buffer.from(reader.result)
        files.push({path: path, content: buffer})
        // ipfs.files.mkdir("/" + release_title)
        ipfs.files.write(path, buffer, {create: true}).then(console.log)
      }
      let buffer = reader.readAsArrayBuffer(file)
    }
  }

  createRelease = () => {

  }

  handleSubmit = (e, form) => {
    // only upload the last image!
    // or add a 'current photo' to state for previews
    // store images as base64 in IPFS

    e.preventDefault()
    form.validateFields((err, values) => {
      console.log(this.props.contract)
      console.log(values)
      if (err){
        // return message.error('Please check your data and try again.')
      }
      message.success('Submitted!')
      // this.props.contract.createRelease(values.artist,
      //                                   values.title,
      //                                   values.description,
      //                                   values.tracklist,
      //                                   values.price,
      //                                   "QmNjUs7aB6aE1EKy1yQYHUUVymwGXqiVnGkEoGhmx7EVRh", [Buffer.from("QmNjUs7aB6aE1EKy1yQYHUUVymwGXqiVnGkEoGhmx7EVRh")],
      //                                   {from: this.props.user.wallet})
      // .then(console.log)
      // this.props.isUploading()
      this.upload(values.title)
    })
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
          USDConversion={this.props.USDConversion}
          calculateUSD={this.calculateUSD}
          validatePrice={this.validatePrice}
          />
      </Spin>
    );
  }

}

const mapStateToProps = state => ({
  contract: state.web3.contract,
  user: state.user,
  uploader: state.site.uploader,
  USDPrice: state.site.USDPrice,
  USDConversion: state.site.uploader.USDConversion
})

export default connect(mapStateToProps, { setUploaderFileList, isUploading, isNotUploading, setArtworkPreview, setUSDConversion })(NewReleasePage);
