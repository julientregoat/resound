import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUserReleases } from '../../actions/userActions'

import ReleasesManager from './ReleasesManager';
import Withdraw from './Withdraw'

class AccountPage extends Component {

  getUserReleases = () => {
    if (this.props.releases.length === 0){
      this.props.getReleases()
    }
    if (this.props.contract && this.props.user.releases === null){
      this.props.contract.getArtistReleases({from: this.props.user.wallet})
      .then(releaseIDs => {
        let ids = releaseIDs.map(id => id.toNumber())
        this.props.setUserReleases(ids)
      })
    }
  }

  componentDidMount(){
    this.getUserReleases()
  }

  componentDidUpdate(){
    this.getUserReleases()
    console.log('accout page update')
  }

  handleWithdraw = () => {
    this.props.contract.withdraw({from: this.props.user.wallet})
    .then(console.log)
  }

  render() {
    return (
      <div>
        <Withdraw
          earnings={this.props.user.earningsBalance}
          handleWithdraw={this.handleWithdraw}
          />
        <ReleasesManager/>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  contract: state.web3.contract,
  user: state.user,
  releases: state.site.releases
})

export default connect(mapStateToProps, { setUserReleases })(AccountPage);
