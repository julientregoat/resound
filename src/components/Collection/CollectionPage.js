import React, { Component } from 'react';
import CollectionTable from './CollectionTable'

import { Col } from 'antd';

import { connect } from 'react-redux';
import { setUserCollection } from '../../actions/userActions';

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

  render() {
    return (
      <div>
        <Col offset={2}>
          <h1>Your Collection</h1>
        </Col>
        <CollectionTable
          userPurchases={this.props.releases.filter(release => this.props.user.collection.includes(release.id))}
          handleExpand={this.handleExpand}
        />
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
