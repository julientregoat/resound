import React from 'react';

import { Button, Row } from 'antd';

const Withdraw = ({ earnings, handleWithdraw }) => (
  <div className="subcontainer">
    <h3 className="page-item">Total ETH currently stored on Resound: {earnings} ETH</h3>
    <Button type="primary" className="page-item" onClick={handleWithdraw}>Withdraw Earnings</Button>
  </div>
);

export default Withdraw;
