import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router';
import Routes from './utils/routes.js';
import './index.css';
import {Provider} from 'react-redux';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
  <Routes history={browserHistory}/>
</Provider>, document.getElementById('root'),);
