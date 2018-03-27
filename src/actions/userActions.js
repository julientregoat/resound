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

const setUserReleases = releaseIDArray => ({
  type: 'SET_USER_RELEASES',
  payload: {
    releases: releaseIDArray
  }
})

export { setUser, setUserCollection, setUserReleases }
