import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewReleasePage extends Component {

  render() {
    console.log(this.props)
    return (
      <div>
        New Release Page
      </div>
    );
  }

}

const mapStateToProps = state => {
  contract: state.web3.contract
}

export default connect(mapStateToProps)(NewReleasePage);
