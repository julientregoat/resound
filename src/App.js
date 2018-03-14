import React, { Component } from 'react';
import './App.css';
import { Row, Col } from 'antd';

import Header from './components/Header/Header'

import injectWeb3 from 'react-web3-hoc';
import contract from 'truffle-contract';
import ReleasesInterface from './build/contracts/Releases.json';

const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'});
const pull = require('pull-stream/pull');

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
    return true;
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
      // something like this, but for everything to refresh when done
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

  handleSubmit = (event) => {
    event.preventDefault()
    let title = event.target.title.value
    let artist = event.target.artist.value

    this.state.contract.createRelease(artist, title, {from: this.state.userWallet})
    event.target.title.value = ""
    event.target.artist.value = ""
  }

  getFile = (event) => {
    ipfs.files.get("QmNjUs7aB6aE1EKy1yQYHUUVymwGXqiVnGkEoGhmx7EVRh", (err, files) => {
      console.log(files)
      var blob = new Blob([files[0].content], { type: "audio/mp3" })
      console.log(blob)
      var blobUrl = URL.createObjectURL(blob);
      var link = document.createElement("a"); // Or maybe get it from the current document
      link.href = blobUrl;
      link.download = "aDefaultFileName.mp3";
      link.innerHTML = "Click here to download the file";
      link.click()
    })
  }

  captureFile = (event) => {
    const file = event.target.files[0]
    const name = event.target.value + "" // making a copy
    console.log(name)
    function readFileContents (file) {
     return new Promise((resolve) => {
       const reader = new window.FileReader()
       reader.onloadend = (event) => resolve(event.target.result)
       reader.readAsArrayBuffer(file)
       })
     }

     readFileContents(file).then((buffer) => {
       const stream = ipfs.files.addPullStream()
       pull(
        pull.values([
          { path: name, content: Buffer.from(buffer) }
        ]),
        stream,
        pull.collect((err, values) => {
          console.log(err, values)
        })
      )
     }).catch(console.log)

     // readFileContents(file).then((buffer) => {
     //   ipfs.files.addReadableStream({path: name, content: Buffer.from(buffer)}, (err, filesAdded) => {
     //     if (err) {
     //       console.log(err)
     //     } else {
     //       console.log("yay", filesAdded)
     //     }
     //   })
     // }).catch(console.log)
   }

  render() {
    return (
      <div className="App">
        <Row type="flex" justify="center"><Header /></Row>
        <h5>Submit New Release:</h5>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="title" placeholder="Release Title"/>
          <input type="text" name="artist" placeholder="Artist Name" />
          <input type="file" name="upload" onChange={this.captureFile}/>
          <input type="submit" />
        </form>
        <button onClick={this.getFile}>Get File</button>
        <h5> All Releases:</h5>
        <ol>
          {this.state.releases.map(release => <li key={release.id} onClick={() => this.purchaseRelease(release.id)}>{release.address} - {release.artist} - {release.title}</li>)}
        </ol>
      </div>
    );
  }
}

export default injectWeb3()(App);
