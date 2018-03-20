import React from 'react';

import ReleaseCard from './ReleaseCard';
import { Row, Spin } from 'antd'

const LatestReleases = ({ releases }) => (
  <Row gutter={1} align="top" justify="start" type="flex">
    {releases.map(release => <ReleaseCard release={release} key={release.id}/>)}
  </Row>
);

export default LatestReleases;
