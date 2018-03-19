import React, { Component } from 'react';
import './App.css';

import Header from './components/Header/Header';
import HomePage from './components/Home/HomePage';
import AccountPage from './components/Account/AccountPage';
import NewReleasePage from './components/NewRelease/NewReleasePage'

import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import { compose } from 'redux'
import { connect } from 'react-redux'
import { setWeb3 } from './actions/web3Actions'
import { setUser } from './actions/userActions'
import { setReleases } from './actions/releasesActions'
import { setUSDPrice } from './actions/siteActions'

import injectWeb3 from 'react-web3-hoc';
import contract from 'truffle-contract';
import ReleasesInterface from './build/contracts/Releases.json';

class App extends Component {

  constructor(){
    super()
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
          // can use Promise.all here
          this.props.contract.releaseInfo(i).then(console.log)
          this.props.contract.releaseContent(i).then(values => console.log(Buffer.from(values[2][0]).toString('utf8')))
        }
      })
      // solidity getRelease return values => {artist: res[0], title: res[1], id: i, address: res[2]}
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
    // these are both being called twice on app start
    this.setupWeb3()
    this.getUserInfo()

    // change fetch releases only for the Home page later
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
export default compose(withRouter, connect(mapStateToProps, { setWeb3, setUser, setReleases, setUSDPrice }), injectWeb3())(App)
