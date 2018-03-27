import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUserReleases } from '../../actions/userActions'

import ReleasesManager from './ReleasesManager';

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

  componentDidUpdate

  render() {
    return (
      <div>
        Account Page
        <ReleasesManager />
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
