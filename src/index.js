import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import web3reducer from './reducers/web3reducer';

const store = createStore(web3reducer)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
