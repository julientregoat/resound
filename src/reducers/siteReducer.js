const ipfs = require('ipfs-api')({host: 'localhost', port: '5001', protocol: 'http'});

const initialState = {
  USDPrice: 0,
  ipfs: ipfs,
  releases: [],
  modalVisibility: null,
  uploader: {
    uploading: false,
    files: [],
    artworkPreview: null,
    USDConversion: 0
  }
}

export default (state = initialState, action) => {
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
    case 'RESET_ARTWORK_PREVIEW':
      return {
        ...state,
        uploader: {
          ...state.uploader,
          artworkPreview: null
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
        ipfs: action.payload.ipfs
      }
    case 'SET_ALL_RELEASES':
      return {
        ...state,
        releases: action.payload.releases
      }
    case 'ADD_RELEASE':
      // checking to see if a release with this ID already exists
      if (state.releases.filter(release => release.id === action.payload.release.id).length !== 0){
        return { ...state }
      } else {
        return {
          ...state,
          releases: [...state.releases, action.payload.release]
        }
      }
    case 'SHOW_MODAL':
      return {
        ...state,
        modalVisibility: action.payload.modalVisibility
      }
    case 'HIDE_MODAL':
      return {
        ...state,
        modalVisibility: null
      }
    default:
      return state;
  }
}
