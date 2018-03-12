import React, { Component } from 'react';
import './App.css';
import injectWeb3 from 'react-web3-hoc'
import contract from 'truffle-contract'
import ReleasesInterface from './build/contracts/Releases.json'

const ipfsAPI = require('ipfs-api')
const ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})

class App extends Component {
  state = {
    userWallet: null,
    userBalance: null,
    earnings: null,
    contract: null,
    releases: []
  }

  shouldComponentUpdate(){
    // compare accounts etc, prevent endless MetaMask updates?
    return true
  }

  componentDidUpdate(){
    if (this.props.web3 !== undefined && this.state.userWallet === null) {
      this.props.web3.eth.getAccounts((err, res) => this.setState({userWallet: res[0]}))
      const Releases = contract(ReleasesInterface)
      Releases.setProvider(this.props.web3.currentProvider)
      Releases.deployed().then(instance => {
        this.setState({contract: instance})
        this.fetchReleases()
        this.fetchEarnings()
      })
    } else if (this.state.userWallet !== null && this.state.userBalance === null) {
      this.props.web3.eth.getBalance(this.state.userWallet).then(balance => this.setState({userBalance: this.props.web3.utils.fromWei(balance)}))
    } else if (this.props.web3 !== undefined){
      // something like this, but for everything
      this.props.web3.eth.getAccounts((err, res) => this.setState({userWallet: res[0]}))
    }
  }

  fetchEarnings = () => {
    this.state.contract.viewBalance({from: this.state.userWallet}).then(balance => this.setState({earnings : this.props.web3.utils.fromWei(balance.toString())}))
  }

  fetchReleases = () => {
    this.state.contract.releaseCount().then(num => {
      let count = num.toNumber();
      for (let i=0; i < count; i++){
        this.state.contract.releaseInfo(i).then(res => this.setState({releases: [...this.state.releases, {artist: res[0], title: res[1], id: i, address: res[2]}]}))
      }
    })
  }

  purchaseRelease = (id) => {
    this.state.contract.purchaseRelease(id, {value: 2000000000000000000, from: this.state.userWallet})
  }

  // upload = () => {
    // let files = [{path: '~/test.txt'}]
    // ipfs.files.add(files, (err, files) => console.log(err, files))
  // }

  // figure out how to fetch change accounts when metamask changes?
  // issues with IPFS and truffle?

  handleSubmit = (event) => {
    event.preventDefault()
    let title = event.target.title.value
    let artist = event.target.artist.value


    let filePath = event.target.upload.value
    let files = [{path: filePath}]
    ipfs.files.add(files, (err, files) => console.log(err, files))


    // this.state.contract.createRelease(artist, title, {from: this.state.userWallet})
    event.target.title.value = ""
    event.target.artist.value = ""
  }

  render() {
    return (
      <div className="App">
        <h1> Welcome </h1>
        <h5>Wallet: {this.state.userWallet}</h5>
        <h5>Balance: {this.state.userBalance} ETH</h5>
        <h5>Earnings: {this.state.earnings} ETH</h5>
        <h5>Submit New Release:</h5>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="title" placeholder="Release Title"/>
          <input type="text" name="artist" placeholder="Artist Name" />
          <input type="file" name="upload"/>
          <input type="submit" />
        </form>
        <h5> All Releases:</h5>
        <ol>
          {this.state.releases.map(release => <li key={release.id} onClick={() => this.purchaseRelease(release.id)}>{release.address} - {release.artist} - {release.title}</li>)}
        </ol>
      </div>
    );
  }
}

export default injectWeb3()(App);
