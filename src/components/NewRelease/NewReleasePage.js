import React, { Component } from 'react';
import { connect } from 'react-redux';

import NewReleaseForm from './NewReleaseForm'

class NewReleasePage extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target)
    console.log(e.target.file)
  }

  handleIDK = (e) => {
    console.log("hi", e)
  }

  handleUploader = (e) => {
    console.log(e)
    console.log(e.file)
    console.log(e.file.status)
  }

  render() {
    return (
      <div>
        <NewReleaseForm idk={this.handleIDK} submit={this.handleSubmit} upload={this.handleUploader}/>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  contract: state.web3.contract
})

export default connect(mapStateToProps)(NewReleasePage);
