const initialState = {
  USDPrice: 0,
  uploader: {
    uploading: false,
    files: [],
    artworkPreview: null
  }
}

export default (state = initialState, action) => {
  console.log(state)
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
    case 'SET_ARTWORK_PREVIEW':
      return {
        ...state,
        uploader: {
          ...state.uploader,
          artworkPreview: action.payload.artworkPreview
        }
      }
    case 'RESET_FILES':
     return {
       ...state,
       uploader: {
         uploading: false,
         artworkPreview: null,
         files: []
       }
     }
    default:
      return state;
  }
}
