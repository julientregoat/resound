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

  createRelease = (tracklist, values) => {
    console.log(tracklist, values)
    // this.props.contract.createRelease(values.artist,
    //                                   values.title,
    //                                   values.description,
    //                                   values.tracklist,
    //                                   values.price,
    //                                   "QmNjUs7aB6aE1EKy1yQYHUUVymwGXqiVnGkEoGhmx7EVRh",
    //                                   tracklist,
    //                                   {from: this.props.user.wallet})
    // .then(console.log)
    // this.props.isUploading()
  }

  uploadIPFS = (values) => {
    // need to limit filename of release tracks.
    // 120 byte limit, 46b hash, 1b '/', 4b '.mp3'
    // 69 bytes left for the actual filename

    // need to upload images here as well

    // need to handle truncating filenames
    let fileList = this.props.uploader.files
    let fileCount = fileList.length - 1
    let files = []

    for(let i=0; i <= fileCount; i++){

      let reader = new FileReader();

      reader.onloadend = () => {
        buffer = Buffer.from(reader.result)

        ipfs.files.add({content: buffer}).then(result => {
          // converting to buffer here so it translates back correctly
          // should be able to split by the slash since nothing else should have a slice.
          files.push(Buffer.from(result[0].hash + "/" + fileList[i].name))
          i === fileCount ? this.createRelease(files, values) : null
        })
      }

      let buffer = reader.readAsArrayBuffer(fileList[i])
    }
  }

  handleSubmit = (e, form) => {
    // only upload the last image!
    // or add a 'current photo' to state for previews
    // store images as base64 in IPFS

    e.preventDefault()
    form.validateFields((err, values) => {
      console.log(values)
      if (err){
        // return message.error('Please check your data and try again.')
      }
      message.success('Submitted!')
      this.uploadIPFS(values)
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
