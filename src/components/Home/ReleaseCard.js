import React from 'react';

import { Card, Col } from 'antd';

const ReleaseCard = ({ release }) => (
  <Col span={8} className="release-card">
    <Card
      hoverable
      style={{height: 500, width: 350}}
      cover={<img alt="poop" src={release.artwork} />}
      title={release.title}
    >
    <Card.Meta
      title={release.artist}
      description={release.price + " ETH"}
    />
    </Card>
  </Col>
);

export default ReleaseCard;
