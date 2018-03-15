import React, { Component } from 'react';
import { connect } from 'react-redux'
class Header extends Component {

  render() {
    return (
      <div>
        <h1> music website </h1>
        <h5>Wallet: {this.props.user.wallet}</h5>
        <h5>Balance: {this.props.user.walletBalance} ETH</h5>
        <h5>Earnings: {this.props.user.earningsBalance} ETH</h5>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  user:  state.user
})

export default connect(mapStateToProps)(Header);
