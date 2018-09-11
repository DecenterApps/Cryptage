import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import Routes from './Routes';
import store from './store';
import config from './constants/config.json';

const startApp = () => {
  const hasMetaMask = typeof window.web3 !== 'undefined';

  window.web3 = new Web3((window.web3 && window.web3.currentProvider) || config.wsProvider);
  window.web3Subscriber = new Web3(config.wsProvider);
  window.hasMetaMask = hasMetaMask;

  ReactDOM.render(<Routes store={store} />, document.getElementById('root'));
};

window.addEventListener('load', startApp);
