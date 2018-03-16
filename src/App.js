import React, { Component } from 'react';
import './App.css';
import { Row, Col } from 'antd';

import Header from './components/Header/Header';
import HomePage from './components/Home/HomePage';
import AccountPage from './components/Account/AccountPage';
import NewReleasePage from './components/NewRelease/NewReleasePage'

import { Route, Redirect, Switch } from 'react-router-dom';

import { connect } from 'react-redux'
import { setWeb3 } from './actions/web3Actions'
import { setUser } from './actions/userActions'
import { setReleases } from './actions/releasesActions'

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
    if ( this.props.contract ){

      this.props.contract.releaseCount()
      .then(num => {
        let count = num.toNumber();
        console.log(count)

        // iterate through all releases using the total count provided
        for(let i = 0; i < count; i++){
          this.props.contract.releaseInfo(i).then(console.log)
        }
      })
      // solidity getRelease return values => {artist: res[0], title: res[1], id: i, address: res[2]}
    }
  }

  componentDidUpdate(){
    console.log("hi")
    this.setupWeb3()
    this.getUserInfo()
    this.getReleases()
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/me" component={AccountPage}/>
          <Route path="/new" component={NewReleasePage}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    w3: state.web3.instance,
    contract:state.web3.contract,
    user: state.user,
    releases: state.releases
  }
}

export default connect(mapStateToProps, { setWeb3, setUser, setReleases})(injectWeb3()(App));
