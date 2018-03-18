import { combineReducers } from 'redux';
import web3Reducer from './web3Reducer';
import userReducer from './userReducer';
import releasesReducer from './releasesReducer';
import siteReducer from './siteReducer';

export default combineReducers({web3: web3Reducer, user: userReducer, releases: releasesReducer, site: siteReducer})
