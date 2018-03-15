import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Row, Col } from 'antd';

class Header extends Component {

  render() {
    return (
      <div>
        <Row type="flex" justify="center"><h1> music website </h1></Row>
        <Row type="flex" justify="end">
          <span className="menu-item">Wallet: {this.props.user.wallet}</span>
        </Row>
        <Row type="flex" justify="end">
          <span className="menu-item">Balance: {this.props.user.walletBalance} ETH</span>
          <span className="menu-item">Earnings: {this.props.user.earningsBalance} ETH</span>
        </Row>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  user:  state.user
})

export default connect(mapStateToProps)(Header);
