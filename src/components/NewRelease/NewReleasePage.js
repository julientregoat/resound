import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUploaderFileList } from '../../actions/siteActions'

import NewReleaseForm from './NewReleaseForm'

const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'});


class NewReleasePage extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target.description)
  }
  
  setFileList = (e) => {
    this.props.setUploaderFileList(e.fileList)
    // let reader = new FileReader();
    // reader.onloadend = () => {
    //   buffer = Buffer.from(reader.result)
    //   console.log(buffer)
    //   ipfs.files.add({content: buffer}, {progress: (poop)=>console.log(poop)}).then(console.log)
    // }
    // let buffer = reader.readAsArrayBuffer(e.file)
  }

  render() {
    return (
      <div>
        <NewReleaseForm submit={this.handleSubmit} setFileList={this.setFileList}/>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  contract: state.web3.contract,
  uploader: state.site.uploader
})

export default connect(mapStateToProps, { setUploaderFileList })(NewReleasePage);
