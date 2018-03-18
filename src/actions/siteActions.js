const setUSDPrice = (price) => ({
  type: 'SET_USD_PRICE',
  payload: {
    usd: price
  }
})

const setUploaderFileList = (filelist) => ({
  type: 'SET_FILE_LIST',
  payload: {
    files: filelist
  }
})

const isUploading = () => ({
  type: 'IS_UPLOADING'
})

const isNotUploading = () => ({
  type: 'IS_NOT_UPLOADING'
})

const setArtworkPreview = (base64Img) => ({
  type: 'SET_ARTWORK_PREVIEW',
  payload: {
    artworkPreview: base64Img
  }
})

export { setUSDPrice,
        setUploaderFileList,
        isUploading,
        isNotUploading,
        setArtworkPreview }
