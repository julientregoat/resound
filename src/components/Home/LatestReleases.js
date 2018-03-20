import React from 'react';
import { connect } from 'react-redux';

import ReleaseCard from './ReleaseCard';

const LatestReleases = ({ releases }) => (
  <div>
  </div>
);

const mapStateToProps = state => ({
  releases: state.site.releases
})

export default connect(mapStateToProps)(LatestReleases);
