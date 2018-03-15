const initialState = {
  wallet: null,
  walletBalance: 0,
  earningsBalance: 0
}

export default (state = initialState, action) => {
  switch (action.type){
    case 'SET_USER':
      return {
        wallet: action.payload.wallet,
        walletBalance: action.payload.walletBalance,
        earningsBalance: action.payload.earningsBalance
      }
    default:
      return state;
  }
}
