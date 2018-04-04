import React, { Component } from 'react';
import { Col } from 'antd'
import Diagram from '../../EthereumDiagram.jpg'

class AboutPage extends Component {

  render() {
    return (
      <div className="Page">
        <Col offset={2}><h1 className="page-item">What does a decentralized serverless architecture look like?</h1></Col>
        <Col offset={4}><img className="diagram" alt="architecture diagram" src={Diagram} /></Col>
      </div>
    );
  }

}

export default AboutPage;
