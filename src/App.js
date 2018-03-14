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
      releasesContract.setProvider(this.props.web3)

      this.props.setWeb3(this.props.web3, releasesContract)
    }
  }

  // call this every time a transaction happens?
  // should I break this up? all three values are related.
  getUserInfo = () => {
    if (this.props.w3 && !this.props.user.wallet){
      this.props.w3.eth.getAccounts()
      .then(account => {
        this.props.w3.eth.getBalance(account[0])
        .then(balance => {
          console.log(account, this.props.web3.utils.fromWei(balance))
        })


        return true // so the promise warning leaves me alone
      })
    }
  }

  componentDidUpdate(){
    this.setupWeb3()
    this.getUserInfo()
  }

  // fetchEarnings = () => {
  //   this.state.contract.viewBalance({from: this.state.userWallet}).then(balance => this.setState({earnings : this.props.web3.utils.fromWei(balance.toString())}))
  // }
  //
  // fetchReleases = () => {
  //   this.state.contract.releaseCount().then(num => {
  //     let count = num.toNumber();
  //     for (let i=0; i < count; i++){
  //       this.state.contract.releaseInfo(i).then(res => this.setState({releases: [...this.state.releases, {artist: res[0], title: res[1], id: i, address: res[2]}]}))
  //     }
  //   })
  // }
  //
  // purchaseRelease = (id) => {
  //   this.state.contract.purchaseRelease(id, {value: 2000000000000000000, from: this.state.userWallet})
  // }
  //
  // handleSubmit = (event) => {
  //   event.preventDefault()
  //   let title = event.target.title.value
  //   let artist = event.target.artist.value
  //
  //   this.state.contract.createRelease(artist, title, {from: this.state.userWallet}).then(console.log)
  //   event.target.title.value = ""
  //   event.target.artist.value = ""
  // }
  //
  // getFile = (event) => {
  //   ipfs.files.get("QmNjUs7aB6aE1EKy1yQYHUUVymwGXqiVnGkEoGhmx7EVRh", (err, files) => {
  //     console.log(files)
  //     var blob = new Blob([files[0].content], { type: "audio/mp3" })
  //     console.log(blob)
  //     var blobUrl = URL.createObjectURL(blob);
  //     var link = document.createElement("a"); // Or maybe get it from the current document
  //     link.href = blobUrl;
  //     link.download = "aDefaultFileName.mp3";
  //     link.innerHTML = "Click here to download the file";
  //     link.click()
  //   })
  // }
  //
  // captureFile = (event) => {
  //   const file = event.target.files[0]
  //   const name = event.target.value + "" // making a copy
  //   console.log(name)
  //   function readFileContents (file) {
  //    return new Promise((resolve) => {
  //      const reader = new window.FileReader()
  //      reader.onloadend = (event) => resolve(event.target.result)
  //      reader.readAsArrayBuffer(file)
  //      })
  //    }
  //
  //    readFileContents(file).then((buffer) => {
  //      const stream = ipfs.files.addPullStream()
  //      pull(
  //       pull.values([
  //         { path: name, content: Buffer.from(buffer) }
  //       ]),
  //       stream,
  //       pull.collect((err, values) => {
  //         console.log(err, values)
  //       })
  //     )
  //    }).catch(console.log)
  //
  //    // readFileContents(file).then((buffer) => {
  //    //   ipfs.files.addReadableStream({path: name, content: Buffer.from(buffer)}, (err, filesAdded) => {
  //    //     if (err) {
  //    //       console.log(err)
  //    //     } else {
  //    //       console.log("yay", filesAdded)
  //    //     }
  //    //   })
  //    // }).catch(console.log)
  //  }

  render() {
    return (
      <div className="App">
        <Row type="flex" justify="center"><Header /></Row>
        <button onClick={this.getFile}>Get File</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    w3: state.web3.instance,
    user: state.user
  }
}

export default connect(mapStateToProps, { setWeb3, setUser })(injectWeb3()(App));
