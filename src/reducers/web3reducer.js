const initialState = {
  web3: null,
  contract: null,
  wallet: 0x00000,
  balance: 0,
  earnings: 0,
  releases: []
}

export default (state = initialState, action) => {
  switch (action.type){
    default:
      return state;
  }
}
