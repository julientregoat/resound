import React from 'react';

import ReleaseCard from './ReleaseCard';
import { Spin} from 'antd'

const LatestReleases = ({ releases }) => (
  <React.Fragment>
    {releases.map(release => <ReleaseCard release={release} key={release.id}/>)}
  </React.Fragment>
);

export default LatestReleases;
