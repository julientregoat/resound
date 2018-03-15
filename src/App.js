import React, { Component } from 'react';
import './App.css';
import { Row, Col, Spin } from 'antd';

import Header from './components/Header/Header'

import { connect } from 'react-redux'
import { setWeb3 } from './actions/web3Actions'
import { setUser } from './actions/userActions'

import injectWeb3 from 'react-web3-hoc';
import contract from 'truffle-contract';
import ReleasesInterface from './build/contracts/Releases.json';
const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'});

class App extends Component {

  setupWeb3 = () => {
    // handle changing of metamask instance?
    // looks like polling at interval is the only answer
    // or checking every time a transaction or something pertinent to the user is going to happen?
    if (!this.props.w3){
      const releasesContract = contract(ReleasesInterface)
      releasesContract.setProvider(this.props.web3.currentProvider)
      releasesContract.deployed().then(instance => this.props.setWeb3(this.props.web3, instance))
    }
  }

  // call this every time a transaction happens?
  // should I break this up into non nested thangs?
  getUserInfo = () => {
    if (this.props.w3 && !this.props.user.wallet){
      let wallet;
      let walletBalance;

      this.props.w3.eth.getAccounts()
      .then(accounts => {
        wallet = accounts[0];
        return this.props.w3.eth.getBalance(wallet);
      })
      .then(walletBal => {
        walletBalance = this.props.web3.utils.fromWei(walletBal)
        return this.props.contract.viewBalance({from: wallet})
      })
      .then(earningsBalance => this.props.setUser(wallet, walletBalance, earningsBalance.toNumber()))
    }
  }

  getReleases = () => {
    this.props.contract.releaseCount()
    .then(num => {
      console.log(num)
      let count = num.toNumber();
      for (let i=0; i < count; i++){
        this.state.contract.releaseInfo(i).then(res => this.setState({releases: [...this.state.releases, {artist: res[0], title: res[1], id: i, address: res[2]}]}))
      }
    })
    // solidity return values => {artist: res[0], title: res[1], id: i, address: res[2]}
  }

  componentDidUpdate(){
    this.setupWeb3()
    this.getUserInfo()

  }

  render() {
    return (
      <div className="App">
        <Row type="flex" justify="center"><Header /></Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    w3: state.web3.instance,
    contract:state.web3.contract,
    user: state.user
  }
}

export default connect(mapStateToProps, { setWeb3, setUser })(injectWeb3()(App));
