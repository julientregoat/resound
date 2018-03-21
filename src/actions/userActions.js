const setUser = (wallet, walletBalance, earningsBalance) => ({
  type: 'SET_USER',
  payload: {
    wallet: wallet,
    walletBalance: walletBalance,
    earningsBalance: earningsBalance
  }
})

const setUserCollection = releaseIDArray => ({
  type: 'SET_USER_COLLECTION',
  payload: {
    collection: releaseIDArray
  }
})

export { setUser, setUserCollection }
