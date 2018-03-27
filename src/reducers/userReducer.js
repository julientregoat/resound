const initialState = {
  wallet: null,
  walletBalance: 0,
  earningsBalance: 0,
  collection: [],
  releases: []
}

export default (state = initialState, action) => {
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
    case 'SET_USER_RELEASES':
      return {
        ...state,
        releases: action.payload.collection
      }
    default:
      return state;
  }
}
