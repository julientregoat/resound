import { combineReducers } from 'redux';
import web3Reducer from './web3Reducer';
import userReducer from './userReducer';
import siteReducer from './siteReducer';

export default combineReducers({web3: web3Reducer, user: userReducer, site: siteReducer})
