import React, { Component } from 'react';
import LatestReleases from './LatestReleases';

import { connect } from 'react-redux';
import { setReleases } from '../../actions/siteActions';

class HomePage extends Component {

  getReleases = () => {
    if ( this.props.contract ){

      this.props.contract.releaseCount()
      .then(num => {
        let count = num.toNumber();
        let releases = [];

        console.log(count)

        // iterate through all releases using the total count provided
        for(let i = 0; i < count; i++){
          // can use Promise.all here

          Promise.all([this.props.contract.releaseInfo(i), this.props.contract.releaseContent(i)])
          .then(console.log)
          // this.props.contract.releaseInfo(i).then(console.log)
          // this.props.contract.releaseContent(i).then(values =>{
          //   console.log(Buffer.from(values[2][0]).toString('utf8'), values[0].toNumber(), values[2])
          // })
        }
      })
      // solidity
      // releaseInfo return values => {address, artist, release title, description, tracklist}}
      // releaseContent return values => {price, artwork, files}
      // need to convert files using Buffer.from(values[2][i])

    }
  }

  componentDidMount(){
    // is this not rendering the first time because the contract isn't available?
    // probably.
    this.getReleases()
  }

  render() {
    return (
      <div>
        <LatestReleases />
      </div>
    );
  }

}

const mapStateToProps = state => ({
  ipfs: state.site.ipfs,
  contract: state.web3.contract
})

export default connect(mapStateToProps, { setReleases })(HomePage);
