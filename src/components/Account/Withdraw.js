import React from 'react';

import { Button, Row, Col } from 'antd';

const Withdraw = ({ earnings, handleWithdraw }) => (
  <Row className="subcontainer">
    <Col span={22} offset={1}><h3 className="page-item">Total ETH currently stored on Resound: {earnings} ETH</h3></Col>
    <Col span={22} offset={1}><Button type="primary" className="page-item" onClick={handleWithdraw}>Withdraw Earnings</Button></Col>
  </Row>
);

export default Withdraw;
