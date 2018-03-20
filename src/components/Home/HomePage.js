import React, { Component } from 'react';
import LatestReleases from './LatestReleases';

import { connect } from 'react-redux';
import { setReleases } from '../../actions/siteActions';

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

  getReleases = () => {
    if ( this.props.contract && this.props.releases.length === 0){

      this.props.contract.releaseCount()
      .then(num => {
        let count = num.toNumber();
        let releases = [];

        // iterate through all releases using the total count provided
        for(let i = 0; i < count; i++){

          Promise.all([
            this.props.contract.releaseInfo(i),
            this.props.contract.releaseContent(i)
          ])
          .then(release => {
            this.props.ipfs.files.cat(release[1][1])
            .then(artworkString => {
              releases.push({
                id: i,
                owner: release[0][0],
                artist: release[0][1],
                title: release[0][2],
                description: release[0][3],
                tracklist: release[0][4],
                // converting price to correct number of decimals
                price: this.fromMillietherBigNum(release[1][0]),
                artwork: artworkString,
                files: this.fileBufferConversion(release[1][2])
              })
              // this should be better than doing it outside of the promises?
              i === count - 1 ? this.props.setReleases(releases) : null
            })
            .catch(console.log)
          })
        }
      })
    }
  }

  componentDidMount(){
    // is this not rendering the first time because the contract isn't available?
    this.getReleases()
  }

  componentDidUpdate(){
    console.log('hi')
  }

  render() {
    return (
      <div>
        <LatestReleases releases={this.props.releases}/>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  ipfs: state.site.ipfs,
  contract: state.web3.contract,
  releases: state.site.releases
})

export default connect(mapStateToProps, { setReleases })(HomePage);
