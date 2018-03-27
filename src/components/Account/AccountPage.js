import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUserReleases } from '../../actions/userActions'

import ReleasesManager from './ReleasesManager';
import Withdraw from './Withdraw'

class AccountPage extends Component {

  fetchUserReleases = () => {
    this.props.contract.getArtistReleases({from: this.props.user.wallet}).
    then(releaseIDs => {
      let ids = releaseIDs.map(id => id.toNumber())
      this.props.setUserReleases(ids)
    })
  }

  componentDidMount(){
    if (this.props.user.releases.length !== 0){
      this.fetchUserReleases()
    } else {
      this.props.fetchReleases()
      setTimeout(this.fetchUserReleases, 5000)
    }
  }

  handleWithdraw = () => {
    this.props.contract.withdraw({from: this.props.user.wallet})
    .then(console.log)
  }

  componentDidUpdate

  render() {
    return (
      <div>
        <Withdraw
          earnings={this.props.user.earningsBalance}
          handleWithdraw={this.handleWithdraw}/>
        <ReleasesManager/>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  contract: state.web3.contract,
  user: state.user,
  fetchReleases: state.site.fetchReleases
})

export default connect(mapStateToProps, { setUserReleases })(AccountPage);
