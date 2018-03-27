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
import { setUSDPrice, addRelease } from './actions/siteActions'

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
    if (!this.props.w3 && this.props.web3){
      const releasesContract = contract(ReleasesInterface)
      releasesContract.setProvider(this.props.web3.currentProvider)
      releasesContract.deployed().then(instance => this.props.setWeb3(this.props.web3, instance))
    }
  }

  fromWei = wei => {
    return wei / 1000000000000000000
  }

  // called defaults to false so that it only can be called on startup or when 'called' is true
  getUserInfo = (called = false) => {
    if (this.props.w3 && (!this.props.user.wallet || called)){
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
      .then(earningsBalance => this.props.setUser(wallet, walletBalance, this.fromWei(earningsBalance.toNumber())))
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
    console.log('app update')
  }

  // this converts the price integer located in the Release struct
  // integer to 4 decimal places -> 0.0000, stored in struct as 00000
  // need to convert back and forth when interacting with 'price'
  correctDecimalPlace = bigNum => {
    return bigNum.toNumber() / 10000
  }

  fileBufferConversion = (bufferArray) => {
    let fileList = []
    bufferArray.forEach(bufferString => {
      // the bufferString is an array of hex strings
      // I convert to a Buffer object to convert it into readable string
      // each file is stored in a string with format '[IPFSfilehash]/[filename]'
      let fileDetails = Buffer.from(bufferString).toString('utf8').split('/')
      fileList.push({location: fileDetails[0], fileName: fileDetails[1]})
    })
    return fileList
  }

  fetchReleaseInfo = id => {
    if (this.props.releases.filter(release => release.id === id).length === 0){
      Promise.all([
        this.props.contract.releaseInfo(id, {from: this.props.user.wallet, gas: 1200000}),
        this.props.contract.releaseContent(id, {from: this.props.user.wallet, gas: 1200000})
      ])
      .then(release => {
        this.props.ipfs.files.cat(release[1][1])
        .then(artworkString => {
          let releaseObj = {
            key: id,
            id: id,
            owner: release[0][0],
            artist: release[0][1],
            title: release[0][2],
            description: release[0][3],
            tracklist: release[0][4],
            price: this.correctDecimalPlace(release[1][0]),
            artwork: artworkString,
            files: this.fileBufferConversion(release[1][2])
          }
          this.props.addRelease(releaseObj)
        })
        .catch(console.log)
      })
    }
  }

  getReleases = () => {
    if ( this.props.contract && this.props.releases ){
      this.props.contract.releaseCount()
      .then(num => {
        // check total number of releases in smart contract and compare to number of releases in the store
        let count = num.toNumber();

        // iterate through all releases using the total count provided
        for(let i = this.props.releases.length; i < count; i++){
          this.fetchReleaseInfo(i)
        }
      })
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" render={routeProps => (
              <HomePage
                {...routeProps}
                getReleases={this.getReleases}
              />
          )} />
          <Route path="/collection" render={routeProps => (
              <CollectionPage
                {...routeProps}
                getReleases={this.getReleases}
                getUserInfo={this.getUserInfo}
              />
          )}/>
          <Route path="/me" render={routeProps => (
            <AccountPage
              {...routeProps}
              getReleases={this.getReleases}
              getUserInfo={this.getUserInfo}
            />
          )}/>
        <Route path="/new" render={routeProps => (
            <NewReleasePage
              {...routeProps}
              getUserInfo={this.getUserInfo}
            />
          )}/>
          <Route path="/about" component={AboutPage}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  w3: state.web3.instance,
  contract: state.web3.contract,
  ipfs: state.site.ipfs,
  user: state.user,
  releases: state.site.releases,
  USDPrice: state.site.USDPrice
})

export default compose(withRouter, connect(mapStateToProps, { setWeb3, setUser, setUSDPrice, addRelease }), injectWeb3())(App)
