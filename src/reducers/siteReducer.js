const initialState = {
  USDPrice: 0
}

export default (state = initialState, action) => {
  switch(action.type){
    case 'SET_USD_PRICE':
      return {USDPrice: action.payload.usd}
    default:
      return state;
  }
}
