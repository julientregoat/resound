import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUserReleases } from '../../actions/userActions'

import UserReleasesManager from './UserReleasesManager';
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
        this.props.setUserReleases(ids)
      })
    }
  }

  componentDidMount(){
    this.props.getUserInfo(true)
    this.getUserReleases()
  }

  componentDidUpdate(){
    this.getUserReleases()
    console.log('account page update')
  }

  handleWithdraw = () => {
    this.props.contract.withdraw({from: this.props.user.wallet, gas: 50000})
    .then(res => {
      setTimeout(() => this.props.getUserInfo(true), 4000)
      message.success('Withdraw complete!')
    })
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
        {this.props.user.releases ?
          <UserReleasesManager userReleases={this.props.releases.filter(release => this.props.user.releases.includes(release.id))}/> :
          <div> No releases here!</div>}
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
