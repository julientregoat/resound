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

export { setUSDPrice, setUploaderFileList, isUploading, isNotUploading }
