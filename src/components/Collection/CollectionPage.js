import React, { Component } from 'react';
import CollectionTable from './CollectionTable'

import { Col } from 'antd';

import { connect } from 'react-redux';
import { setUserCollection } from '../../actions/userActions';

const fileDownload = require('js-file-download')

class CollectionPage extends Component {

  getUserPurchases = () => {
    if (this.props.releases.length === 0){
      this.props.getReleases()
    }
    console.log(this.props.user.collection)
    if (this.props.contract && this.props.user.collection === null){
      console.log('hi')
      this.props.contract.getUserPurchases({from: this.props.user.wallet})
      .then(bigNums => {
        let normalNums = bigNums.map(bigNum => bigNum.toNumber())
        console.log("poop", bigNums)
        this.props.setUserCollection(normalNums)
      })
      .catch(console.log)
    }
  }

  componentDidMount(){
    this.props.getUserInfo(true)
    this.getUserPurchases()
  }

  componentDidUpdate(){
    this.props.getUserInfo(true)
    this.getUserPurchases()
  }

  handleDownload = file => {
    // really hacky way to deal with an annoying issue.
    // filenames are 120bytes fixed => extra space at the end of string
    // there's gotta be a nicer way to do this.

    let name = file.fileName.toString().split('.mp3')

    this.props.ipfs.files.get(file.location)
    .then(data => {
      fileDownload(data[0].content, name[0] + ".mp3")
    })
  }

  render() {
    return (
      <div className="Page">
        <Col offset={1}>
          <h1>Your Collection</h1>
        </Col>
        {this.props.user.collection ?
          <CollectionTable
          userPurchases={this.props.releases.filter(release => this.props.user.collection.includes(release.id))}
          handleExpand={this.handleExpand}
          handleDownload={this.handleDownload}/> :
          <div> No releases here!</div>
          }

      </div>
    );
  }

}

const mapStateToProps = state => ({
  ipfs: state.site.ipfs,
  releases: state.site.releases,
  contract: state.web3.contract,
  user: state.user
})

export default connect(mapStateToProps, { setUserCollection })(CollectionPage);
