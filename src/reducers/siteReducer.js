const ipfs = require('ipfs-api')({host: 'localhost', port: '5001', protocol: 'http'});

const initialState = {
  USDPrice: 0,
  IPFS: ipfs,
  uploader: {
    uploading: false,
    files: [],
    artworkPreview: null,
    USDConversion: 0
  }
}

export default (state = initialState, action) => {
  console.log(state, action)
  switch(action.type){
    case 'SET_USD_PRICE':
      return {
        ...state,
        USDPrice: action.payload.usd
      }
    case 'SET_USD_CONVERSION':
      return {
        ...state,
        uploader: {
          ...state.uploader,
          USDConversion: action.payload.usd
        }
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
     case 'SET_IPFS':
      return {
        ...state,
        IPFS: action.payload.ipfs
      }
    default:
      return state;
  }
}
