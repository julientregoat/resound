const initialState = {
  USDPrice: 0,
  uploader: {
    uploading: false,
    files: []
  }
}

export default (state = initialState, action) => {
  switch(action.type){
    case 'SET_USD_PRICE':
      return {
        ...state,
        USDPrice: action.payload.usd
      }
    case 'SET_FILE_LIST':
      return {
        ...state,
        uploader: {
          ...state.uploader,
          files: action.payload.files
        }
      }
    case 'IS_UPLOADING':
    return {
      ...state,
      uploader: {
        ...state.uploader,
        uploading: true
      }
    }
    case 'IS_NOT_UPLOADING':
      return {
        ...state,
        uploader: {
          ...state.uploader,
          uploading: false
        }
      }
    case 'RESET_FILES':
     return {
       ...state,
       uploader: {
         ...state.uploader,
         files: []
       }
     }
    default:
      return state;
  }
}
