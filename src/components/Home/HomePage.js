import React, { Component } from 'react';

class HomePage extends Component {

  render() {
    console.log("home props", this.props)
    return (
      <div>
        Home Page
      </div>
    );
  }

}

export default HomePage;
