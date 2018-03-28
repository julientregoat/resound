import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUserReleases } from '../../actions/userActions'
import { showModal, hideModal, setNewPrice, resetNewPrice } from '../../actions/siteActions'

import { message, Row, Col, Modal, Input } from 'antd'
import UserReleasesManager from './UserReleasesManager';
import Withdraw from './Withdraw'

class AccountPage extends Component {

  getUserReleases = () => {
    if (this.props.releases.length === 0){
      this.props.getReleases()
    }
    if (this.props.contract && this.props.user.releases === null){
      this.props.contract.getArtistReleases({from: this.props.user.wallet})
      .then(releaseIDs => {
        let ids = releaseIDs.map(id => id.toNumber())
        this.props.setUserReleases(ids)
      })
    }
  }

  componentDidMount(){
    this.props.getUserInfo(true)
    this.getUserReleases()
  }

  componentDidUpdate(){
    this.getUserReleases()
  }

  handleWithdraw = () => {
    this.props.contract.withdraw({from: this.props.user.wallet, gas: 50000})
    .then(res => {
      setTimeout(() => this.props.getUserInfo(true), 4000)
      message.success('Withdraw complete!')
    })
    .catch(err => {
      message.error('An error occured. Please try again later.')
      console.log("Error", err)
    })
  }

  handleEdit = () => {
    let formattedNewPrice = this.props.toTenThousandths(this.props.newPrice)
    let id = this.props.modalVisibility
    let release = this.props.releases.find(release => release.id === id)

    if (!this.props.newPrice || this.props.newPrice === release.price){
      this.props.hideModal()
      return message.warning('No edits detected.')
    } else {
      this.props.contract.changePrice(id, formattedNewPrice, {from: this.props.user.wallet})
      .then(res => {
        this.props.hideModal()
        message.success('Price changed!')
        setTimeout(() => this.props.getUserInfo(true), 4000)
        this.props.resetNewPrice()
      })
      .catch(err => {
        this.props.hideModal()
        message.error('There was an error. Please try again later.')
        console.log('error', err)
      })
    }
  }

  modalContent = () => {
    if (typeof this.props.modalVisibility === "number"){
      let currentRelease = this.props.releases.find(release => release.id === this.props.modalVisibility)
      return (
        <Row type="flex" justify="space-between">
          <Col>
            <h1> {currentRelease.title} </h1>

            <h2> {currentRelease.artist} </h2>

            <h3> Description </h3>
            <p>{currentRelease.description}</p>

            <h3> Tracklisting </h3>
            <p>{currentRelease.description}</p>

            <h3> Price </h3>
            <p><Input
              size="small"
              className="edit-input"
              onChange={(e) => this.props.setNewPrice(e.target.value)}
              defaultValue={currentRelease.price} />
              ETH
            </p>
          </Col>
          <Col>
            <img alt="release art" src={currentRelease.artwork} />
          </Col>
        </Row>

      )
    } else {
      return null
    }
  }

  editReleaseLink = (text, record) => (<a onClick={() => this.props.showModal(record.id)}>Edit</a>)

  render() {
    return (
      <div>
        <Withdraw
          earnings={this.props.user.earningsBalance}
          handleWithdraw={this.handleWithdraw}
          />
        {this.props.user.releases ?
          <UserReleasesManager
            userReleases={this.props.releases.filter(release => this.props.user.releases.includes(release.id))}
            editReleaseLink={this.editReleaseLink}
          /> :
          <div> No releases here!</div>}
          <Modal
            visible={typeof this.props.modalVisibility === 'number'}
            closable={false}
            onOk={this.handleEdit}
            okText="Edit Release"
            onCancel={this.props.hideModal}
            width={700}
          >
            {this.modalContent()}
          </Modal>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  contract: state.web3.contract,
  user: state.user,
  releases: state.site.releases,
  modalVisibility: state.site.modalVisibility,
  newPrice: state.site.newPrice
})

export default connect(mapStateToProps, { setUserReleases, showModal, hideModal, setNewPrice, resetNewPrice })(AccountPage);
