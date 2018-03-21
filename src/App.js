import React, { Component } from 'react';
import './App.css';

import Header from './components/Header/Header';
import HomePage from './components/Home/HomePage';
import AccountPage from './components/Account/AccountPage';
import NewReleasePage from './components/NewRelease/NewReleasePage';
import AboutPage from './components/About/AboutPage';
import CollectionPage from './components/Collection/CollectionPage';

import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import { compose } from 'redux'
import { connect } from 'react-redux'
import { setWeb3 } from './actions/web3Actions'
import { setUser } from './actions/userActions'
import { setUSDPrice } from './actions/siteActions'

import injectWeb3 from 'react-web3-hoc';
import contract from 'truffle-contract';
import ReleasesInterface from './build/contracts/Releases.json';

class App extends Component {

  constructor(props){
    super(props)
    this.getEthPrice()
  }

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

      // use Promise.all here
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

  getEthPrice = () => {
    fetch('https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=USD')
    .then(res => res.json())
    .then(json => this.props.setUSDPrice(json[0].price_usd))
  }

  componentDidMount(){
    // checking price once a minute
    setInterval(this.getEthPrice, 60000)
  }

  componentDidUpdate(){
    // these are both being called twice on app start, fix that
    this.setupWeb3()
    this.getUserInfo()
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/me" component={AccountPage}/>
          <Route path="/new" component={NewReleasePage}/>
          <Route path="/about" component={AboutPage}/>
          <Route path="/collection" component={CollectionPage}/>
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  w3: state.web3.instance,
  contract:state.web3.contract,
  user: state.user,
  releases: state.releases,
  USDPrice: state.site.USDPrice
})
export default compose(withRouter, connect(mapStateToProps, { setWeb3, setUser, setUSDPrice }), injectWeb3())(App)
