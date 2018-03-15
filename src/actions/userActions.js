const setUser = (wallet, walletBalance, earningsBalance) => ({
  type: 'SET_USER',
  payload: {
    wallet: wallet,
    walletBalance: walletBalance,
    earningsBalance: earningsBalance
  }
})

export { setUser }
