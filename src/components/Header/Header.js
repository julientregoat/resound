import React from 'react';
import { connect } from 'react-redux'

import Navbar from './Navbar'
import { Row } from 'antd';

const Header = ({ user }) => (
  <div className="header">
    <Row type="flex" justify="space-between" className="header-row">
      <h1> resound </h1>
      <Navbar />
    </Row>

    <Row type="flex" justify="space-between" className="header-row">
      <span className="header-item">Wallet: {user.wallet}</span>
      <span>
        <span className="header-item">Balance: {user.walletBalance} ETH</span>
        <span className="header-item">|</span>
        <span className="header-item">Earnings: {user.earningsBalance} ETH</span>
      </span>
    </Row>
  </div>
);

const mapStateToProps = state => ({
  user:  state.user
})

export default connect(mapStateToProps)(Header);
