import React from 'react';

import { Card, Col } from 'antd';

const ReleaseCard = ({ release }) => (
  <Col span={6}>
    <Card
      hoverable
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
