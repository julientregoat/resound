import React from 'react';
import { connect } from 'react-redux';
import { showModal } from '../../actions/siteActions';

import { Card, Col, Button } from 'antd';

const ReleaseCard = ({ release, showModal }) => (
  <Col span={8} className="release-card">
    <Card
      hoverable
      style={{width: 350}}
      cover={<img alt="poop" src={release.artwork} />}
      title={release.title}
      actions={[<Button ghost type="primary" onClick={() => showModal(release.id)}>More</Button>]}
    >
    <Card.Meta
      title={release.artist}
      description={release.price + " ETH"}
    />
    </Card>
  </Col>
);

export default connect(null, { showModal })(ReleaseCard);
