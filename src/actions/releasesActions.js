const setReleases = releases => ({
  type: 'SET_ALL_RELEASES',
  payload: {
    releases: releases
  }
})

export { setReleases }
