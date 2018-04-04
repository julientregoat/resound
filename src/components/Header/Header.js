import React from 'react';
import { connect } from 'react-redux'

import Navbar from './Navbar'
import { Row, Col, Tag } from 'antd';

const Header = ({ user }) => (
  <div className="header-container">
    <Row type="flex" justify="space-between" className="header">
        <Col span={4}><h1> resound </h1></Col>
        <Col span={11}><Navbar /></Col>
        <Tag color="geekblue" className="user-info-adjust">
          <span><b>Wallet:</b> {user.wallet ? user.wallet.slice(0, 8) : null}...</span>
          <span>  |  </span>
          <span><b>Balance:</b> {user.walletBalance} ETH</span>
          <span>  |  </span>
          <span><b>Earnings:</b> {user.earningsBalance} ETH</span>
        </Tag>
    </Row>
  </div>
);

const mapStateToProps = state => ({
  user:  state.user
})

export default connect(mapStateToProps)(Header);
