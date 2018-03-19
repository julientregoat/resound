import React, { Component } from 'react';

import { connect } from 'react-redux'

class HomePage extends Component {

  render() {
    return (
      <div>
        Home Page
      </div>
    );
  }

}

const mapStateToProps = state => ({
  ipfs: state.site.ipfs
})

export default connect(mapStateToProps)(HomePage);
