const initialState = {
  releases: []
}

export default (state = initialState, action) => {
  switch (action.type){
    case 'SET_ALL_RELEASES':
      return {releases: [action.payload.releases]}
    default:
      return state
  }
}
