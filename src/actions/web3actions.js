const setWeb3 = (web3) => {
  return {
    type: 'SET_WEB3_INSTANCE',
    payload: {
      ready: true,
      web3: web3
    }
  }
}

export { setWeb3 }
