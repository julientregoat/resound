import React, { Component } from 'react';

import { connect } from 'react-redux'

class HomePage extends Component {

  render() {
    this.props.ipfs.ls("QmeuZPWmrR3BNTntAZapxYFc5d2aLwLhL7XSY5fhYBD3Ku").then(console.log)
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
