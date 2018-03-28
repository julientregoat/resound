import React from 'react';
import { connect } from 'react-redux'

import Navbar from './Navbar'
import { Row, Col } from 'antd';

const Header = ({ user }) => (
  <div className="header-container">
    <Row type="flex" justify="space-between" className="header">
        <h1> resound </h1>
        <span>
          <Navbar />
          <Col offset={6}>
            <span className="header-item">Wallet: {user.wallet ? user.wallet.slice(0, 8) : null}...</span>
            <span className="header-item">|</span>
            <span className="header-item">Balance: {user.walletBalance} ETH</span>
            <span className="header-item">|</span>
            <span className="header-item">Earnings: {user.earningsBalance} ETH</span>
          </Col>
        </span>
    </Row>
  </div>
);

const mapStateToProps = state => ({
  user:  state.user
})

export default connect(mapStateToProps)(Header);
