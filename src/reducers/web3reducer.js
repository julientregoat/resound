const initialState = {
  ready: false,
  web3: null,
  contract: null
}

export default (state = initialState, action) => {
  switch (action.type){
    case 'SET_WEB3_INSTANCE':
      return {instance: action.payload.instance, ready: action.payload.ready, contract: action.payload.contract}
    default:
      return state;
  }
}
