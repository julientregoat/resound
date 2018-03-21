import React, { Component } from 'react';
import CollectionTable from './CollectionTable'

import { connect } from 'react-redux';
import { setUserCollection } from '../../actions/userActions';

class CollectionPage extends Component {

  fetchUserPurchases = () => {
    // need to error handle a bit better if user goes to collection first
    // or perhaps delay rendering until the contract is available?
    if (this.props.contract){
      this.props.contract.getUserPurchases({from: this.props.user.wallet})
      .then(bigNums => {
        let normalNums = bigNums.map(bigNum => bigNum.toNumber())
        console.log(normalNums)
      })
      .catch(console.log)
    }
  }

  componentDidUpdate(){
    this.fetchUserPurchases()
  }

  render() {
    return (
      <div>
        <h1>Your Collection</h1>
        <CollectionTable userPurchases={this.props.releases }/>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  releases: state.site.releases,
  contract: state.web3.contract,
  user: state.user
})

export default connect(mapStateToProps, { setUserCollection })(CollectionPage);
