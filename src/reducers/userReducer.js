const initialState = {
  wallet: null,
  walletBalance: 0,
  earningsBalance: 0,
  collection: []
}

export default (state = initialState, action) => {
  console.log(action)
  switch (action.type){
    case 'SET_USER':
      return {
        ...state,
        wallet: action.payload.wallet,
        walletBalance: action.payload.walletBalance,
        earningsBalance: action.payload.earningsBalance
      }
    case 'SET_USER_COLLECTION':
      return {
        ...state,
        collection: action.payload.collection
      }
    default:
      return state;
  }
}
