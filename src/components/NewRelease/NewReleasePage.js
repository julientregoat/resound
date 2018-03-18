import React, { Component } from 'react';
import { connect } from 'react-redux';

import NewReleaseForm from './NewReleaseForm'

class NewReleasePage extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target)
    console.log(e.target.file)
  }

  handleUploader = (e) => {
    console.log(e.file)
    let buffer;
    let reader = new FileReader();
    reader.onloadend = (ev) => {
      console.log(ev)
      console.log(buffer)
    }
    buffer = reader.readAsArrayBuffer(e.file)
    // let arybuffer = reader.readAsArrayBuffer(e)
    // console.log(Buffer.from(arybuffer))
    // dispatch action or how do I handle file hash?
    // fetch('http://127.0.0.1:5001/api/v0/add/',{
    //   method: 'POST',
    //   headers: {'Content-Type': 'audio/mp3'},
    //   body: Buffer.from(e.file)
    // }).then(console.log)

  }

  render() {
    return (
      <div>
        <NewReleaseForm submit={this.handleSubmit} upload={this.handleUploader}/>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  contract: state.web3.contract
})

export default connect(mapStateToProps)(NewReleasePage);
