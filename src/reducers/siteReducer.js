const initialState = {
  USDPrice: 0,
  uploader: {
    files: []
  }
}

// create 'unpinAll' function for IPFS

export default (state = initialState, action) => {
  switch(action.type){
    case 'SET_USD_PRICE':
      return {...state, USDPrice: action.payload.usd}
    case 'ADD_FILE':
      return {...state, uploader: {files: [...state.uploader.files, action.payload.file]}}
    case 'RESET_FILES':
     return {...state, uploader: {files: []}}
    default:
      return state;
  }
}
