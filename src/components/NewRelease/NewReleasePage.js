import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUploaderFileList,
         isUploading,
         isNotUploading,
         setArtworkPreview,
         resetArtworkPreview,
         setUSDConversion } from '../../actions/siteActions';

import { Spin, message } from 'antd';
import NewReleaseForm from './NewReleaseForm';

const Jimp = require('jimp')

class NewReleasePage extends Component {

  componentDidMount(){
    this.props.getUserInfo(true)
  }

  componentDidUpdate(){
    console.log('new release update')
  }

  calculateUSD = (e) => {
    this.props.setUSDConversion(e.target.value * this.props.USDPrice)
  }

  validatePrice = (rule, value, callback) => {
    isNaN(parseInt(value, 10)) ? callback("Must be a number!") : callback()
  }

  toMilliether = valueString => {
    let scrubbed = valueString

    // comes in as a string. scrub down to 4 decimal places if there is one
    if (valueString.includes(".")){
      let splitValues = valueString.split(".")
      splitValues[1] = splitValues[1].slice(0,4)
      scrubbed = splitValues.join(".")
    }

    let float = parseFloat(scrubbed)
    return float * 10000
  }

  getBase64 = img => {
    // need to implement something for loading pic time
    const reader = new FileReader();
    reader.onloadend = () => {
      Jimp.read(Buffer.from(reader.result))
      .then(img => {
        img.resize(300, 300)
        .getBase64(Jimp.AUTO, (err, base64) => this.props.setArtworkPreview(base64));
        this.props.isNotUploading()
      })
      .catch(err => console.log("error", err))
    }
    reader.readAsArrayBuffer(img)
  }

  createRelease = (tracklistHashes, artworkHash, values, form) => {
    this.props.contract.createRelease(values.artist,
                                      values.title,
                                      values.description,
                                      values.tracklist,
                                      this.toMilliether(values.price),
                                      artworkHash,
                                      tracklistHashes,
                                      {from: this.props.user.wallet})
    .then(res => {
      this.props.isNotUploading()
      form.resetFields()
      this.props.resetArtworkPreview()
      this.props.getUserInfo(true)
      message.success('Release uploaded!')
    })
    .catch(res => {
      message.error('There was an error uploading your release. Please try again.')
      console.log("create release error", res)
    })
    // this.props.isUploading()
  }

  uploadIPFS = (values, form) => {
    // need to limit filename of release tracks.
    // 120 byte limit, 46b hash, 1b '/', 4b '.mp3'
    // 69 bytes left for the actual filename

    // uploading the image first
    this.props.ipfs.files.add({content: Buffer.from(this.props.uploader.artworkPreview)})
    .then(artwork => {
      // need to handle truncating filenames
      let fileList = this.props.uploader.files
      let fileCount = fileList.length - 1
      let files = []

      //should this be exported to a singular function to call on each iteration?
      for(let i=0; i <= fileCount; i++){

        let reader = new FileReader();

        reader.onloadend = () => {
          buffer = Buffer.from(reader.result)

          this.props.ipfs.files.add({content: buffer}).then(result => {

            // add buffered strings to our file list
            files.push(Buffer.from(result[0].hash + "/" + fileList[i].name))
            // check if we're at the end of the list, and if we are, callback
            i === fileCount ? this.createRelease(files, artwork[0].hash, values, form) : null

          }).catch("file error", console.log)
        }

        let buffer = reader.readAsArrayBuffer(fileList[i])
      }
    })
    .catch("artwork error", console.log)

  }

  handleSubmit = (e, form) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (err){
        return message.error('Please check your data and try again.')
      }
      window.scroll(0,0)
      this.props.isUploading()
      this.uploadIPFS(values, form)
    })
  }

  setFileList = (fileInfo) => {
    this.props.setUploaderFileList(fileInfo.fileList)
  }

  setImage = (fileInfo) => {
    this.props.isUploading()
    this.getBase64(fileInfo.file)
  }

  render() {
    return (
      <Spin
        size="large"
        tip="Uploading release... Make sure you accept the Metamask prompt."
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
  USDConversion: state.site.uploader.USDConversion,
  ipfs: state.site.ipfs
})

export default connect(mapStateToProps, { setUploaderFileList, isUploading, isNotUploading, setArtworkPreview, setUSDConversion, resetArtworkPreview })(NewReleasePage);
