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

export { setUSDPrice, setUploaderFileList }
