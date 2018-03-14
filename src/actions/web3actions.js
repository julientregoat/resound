const setWeb3 = (web3, contract) => ({
  type: 'SET_WEB3_INSTANCE',
  payload: {
    ready: true,
    instance: web3,
    contract: contract
  }
})

export { setWeb3 }
