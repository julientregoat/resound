import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUserReleases } from '../../actions/userActions'

import ReleasesManager from './ReleasesManager';
import Withdraw from './Withdraw'
import { message } from 'antd'

class AccountPage extends Component {

  getUserReleases = () => {
    if (this.props.releases.length === 0){
      this.props.getReleases()
    }
    if (this.props.contract && this.props.user.releases === null){
      this.props.contract.getArtistReleases({from: this.props.user.wallet})
      .then(releaseIDs => {
        let ids = releaseIDs.map(id => id.toNumber())
        console.log(ids)
        this.props.setUserReleases(ids)
      })
    }
  }

  componentDidMount(){
    this.getUserReleases()
  }

  componentDidUpdate(){
    this.getUserReleases()
  }

  handleWithdraw = () => {
    this.props.contract.withdraw({from: this.props.user.wallet, gas: 50000})
    .then(res => message.success('Withdraw complete!'))
    .catch(err => {
      message.error('An error occured. Please try again later.')
      console.log("Error", err)
    })
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
