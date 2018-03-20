import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUploaderFileList,
         isUploading,
         isNotUploading,
         setArtworkPreview,
         setUSDConversion } from '../../actions/siteActions'

import { Spin, message } from 'antd'
import NewReleaseForm from './NewReleaseForm'

class NewReleasePage extends Component {

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

  getBase64(img) {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.props.setArtworkPreview(reader.result)
    }
    reader.readAsDataURL(img);
  }

  createRelease = (tracklistHashes, artworkHash, values) => {
    this.props.contract.createRelease(values.artist,
                                      values.title,
                                      values.description,
                                      values.tracklist,
                                      this.toMilliether(values.price),
                                      artworkHash,
                                      tracklistHashes,
                                      {from: this.props.user.wallet})
    .then(res => {
      message.success('Release uploaded!')
      // clear form here
    })
    .catch(res => {
      message.error('There was an error uploading your release. Please try again.')
      console.log("create release error", res)
    })
    // this.props.isUploading()
  }

  uploadIPFS = (values) => {
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

      //iterating through the file list
      for(let i=0; i <= fileCount; i++){

        let reader = new FileReader();

        reader.onloadend = () => {
          buffer = Buffer.from(reader.result)

          this.props.ipfs.files.add({content: buffer}).then(result => {
            // converting to buffer here so it translates back correctly
            // should be able to split by the slash since nothing else should have a slice.

            files.push(Buffer.from(result[0].hash + "/" + fileList[i].name))
            i === fileCount ? this.createRelease(files, artwork[0].hash, values) : null
          }).catch("file error", console.log)
        }
        let buffer = reader.readAsArrayBuffer(fileList[i])
      }
    })
    .catch("artwork error", console.log)

  }

  handleSubmit = (e, form) => {
    // only upload the last image!
    // or add a 'current photo' to state for previews
    // store images as base64 in IPFS
    console.log(this.props.ipfs)
    e.preventDefault()
    form.validateFields((err, values) => {
      console.log(values)
      if (err){
        // return message.error('Please check your data and try again.')
      }
      // start uploading thing here, change it at end of chain
      this.uploadIPFS(values)
    })
  }

  setFileList = (fileInfo) => {
    this.props.setUploaderFileList(fileInfo.fileList)
  }

  setImage = (fileInfo) => {
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
  USDConversion: state.site.uploader.USDConversion,
  ipfs: state.site.ipfs
})

export default connect(mapStateToProps, { setUploaderFileList, isUploading, isNotUploading, setArtworkPreview, setUSDConversion })(NewReleasePage);
