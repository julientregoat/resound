import React, { Component } from 'react';
import CollectionTable from './CollectionTable'

import { Col } from 'antd';

import { connect } from 'react-redux';
import { setUserCollection } from '../../actions/userActions';

const fileDownload = require('js-file-download')
// e.g. fileDownload(data, 'filename.csv');

class CollectionPage extends Component {

  fetchUserPurchases = () => {
    // need to grab releases independently of home page
    if (this.props.contract){
      this.props.contract.getUserPurchases({from: this.props.user.wallet})
      .then(bigNums => {
        let normalNums = bigNums.map(bigNum => bigNum.toNumber())
        this.props.setUserCollection(normalNums)
      })
      .catch(console.log)
    }
  }

  componentDidMount(){
    this.fetchUserPurchases()
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
      <div>
        <Col offset={2}>
          <h1>Your Collection</h1>
        </Col>
        <CollectionTable
          userPurchases={this.props.releases.filter(release => this.props.user.collection.includes(release.id))}
          handleExpand={this.handleExpand}
          handleDownload={this.handleDownload}
        />
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
