const initialState = {
  ready: false,
  web3: null,
  contract: null,
  wallet: 0x00000,
  balance: 0,
  earnings: 0,
  releases: []
}

export default (state = initialState, action) => {
  console.log(state, action)
  switch (action.type){
    case 'SET_WEB3_INSTANCE':
      return {...state, web3: action.payload.web3, ready: action.payload.ready}
    default:
      return state;
  }
}
