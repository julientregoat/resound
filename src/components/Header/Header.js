import React from 'react';
import { connect } from 'react-redux'

import Navbar from './Navbar'
import { Row, Col } from 'antd';

const Header = ({ user }) => (
  <div>
    <Row type="flex" justify="center"><h1> bitcamp </h1></Row>

    <Row type="flex" justify="space-between" className="header-row">
      <span className="header-item">Wallet: {user.wallet}</span>
      <span>
        <span className="header-item">Balance: {user.walletBalance} ETH</span>
        <span className="header-item">|</span>
        <span className="header-item">Earnings: {user.earningsBalance} ETH</span>
      </span>
    </Row>

    <Row type="flex" justify="start" className="header-row">
      <Navbar />
    </Row>

  </div>
);

const mapStateToProps = state => ({
  user:  state.user
})

export default connect(mapStateToProps)(Header);
