import React, { Component } from 'react';
import LatestReleases from './LatestReleases';
import { Modal, Row, Col } from 'antd';

import { connect } from 'react-redux';
import { addRelease, hideModal } from '../../actions/siteActions';

class HomePage extends Component {

  fromMillietherBigNum = bigNum => {
    return bigNum.toNumber() / 10000
  }

  fileBufferConversion = (bufferArray) => {
    let fileList = []
    bufferArray.forEach(bufferString => {
      // the bufferString is an array of hex strings
      // need to convert to a Buffer object to convert it into readable string
      // each file is stored in a string with format '[IPFSfilehash]/[filename]'
      let fileDetails = Buffer.from(bufferString).toString('utf8').split('/')
      fileList.push({location: fileDetails[0], fileName: fileDetails[1]})
    })
    return fileList
  }

  fetchReleaseInfo = id => {
    if (this.props.releases.filter(release => release.id === id).length === 0){
      Promise.all([
        this.props.contract.releaseInfo(id),
        this.props.contract.releaseContent(id)
      ])
      .then(release => {
        this.props.ipfs.files.cat(release[1][1])
        .then(artworkString => {
          let releaseObj = {
            id: id,
            owner: release[0][0],
            artist: release[0][1],
            title: release[0][2],
            description: release[0][3],
            tracklist: release[0][4],
            // converting price to correct number of decimals
            price: this.fromMillietherBigNum(release[1][0]),
            artwork: artworkString,
            files: this.fileBufferConversion(release[1][2])
          }
          this.props.addRelease(releaseObj)
        })
        .catch(console.log)
      })
    }
  }

  getReleases = () => {
    if ( this.props.contract ){

      this.props.contract.releaseCount()
      .then(num => {
        // check total number of releases in smart contract and compare to number of releases in the store
        let count = num.toNumber();

        // iterate through all releases using the total count provided
        for(let i = this.props.releases.length; i < count; i++){
          this.fetchReleaseInfo(i)
        }
      })
    }
  }

  componentDidMount(){
    // is this not rendering the first time because the contract isn't available?
    this.getReleases()
  }

  componentDidUpdate(){
    this.getReleases()
    console.log('hi')
  }

  handlePurchase = () => {
    console.log('hi')
  }

  modalContent = () => {
    if (this.props.modalVisibility){
      let currentRelease = this.props.releases.find(release => release.id === this.props.modalVisibility)
      return (
        <Row type="flex" justify="space-between">
          <Col>
            <h1> {currentRelease.title} </h1>

            <h2> {currentRelease.artist} </h2>

            <h3> Description </h3>
            <p>{currentRelease.description}</p>

            <h3> Tracklisting </h3>
            <p>{currentRelease.description}</p>

            <p> <b>Price:</b> {currentRelease.price} ETH</p>
          </Col>
          <Col>
            <img alt="release art" src={currentRelease.artwork} />
          </Col>
        </Row>

      )
    } else {
      return null
    }
  }

  render() {
    return (
      <div>
        <LatestReleases releases={this.props.releases}/>
        <Modal
          visible={this.props.modalVisibility ? true : false}
          closable={false}
          onOk={this.handlePurchase}
          okText="Purchase Release"
          cancelText="Back"
          onCancel={this.props.hideModal}
          width={700}
        >
          {this.modalContent()}
        </Modal>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  ipfs: state.site.ipfs,
  contract: state.web3.contract,
  releases: state.site.releases,
  modalVisibility: state.site.modalVisibility
})

export default connect(mapStateToProps, { addRelease, hideModal })(HomePage);
