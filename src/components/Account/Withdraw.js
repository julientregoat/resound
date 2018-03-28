import React from 'react';

import { Button, Row, Col } from 'antd';

const Withdraw = ({ earnings, handleWithdraw }) => (
    <Row type="flex" justify="center">
    <Col offset={1} span={6}>
        <h2 className="page-item">Earnings stored: {earnings} ETH</h2>
    </Col>
    <Col span={6}>
      <Button type="primary" className="page-item" onClick={handleWithdraw}>Withdraw Earnings</Button>
    </Col>
    </Row>
);

export default Withdraw;
