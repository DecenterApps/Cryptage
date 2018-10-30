import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import Routes from './Routes';
import store from './store';
import config from './constants/config.json';

const startApp = async () => {
  const hasMetaMask = typeof window.web3 !== 'undefined' || typeof window.ethereum !== 'undefined';
  window.web3Subscriber = new Web3(config.wsProvider);
  window.hasMetaMask = hasMetaMask;

  if (window.ethereum) {
    window.web3 = new Web3(ethereum); // eslint-disable-line

    try {
      await ethereum.enable(); // eslint-disable-line
    } catch (error) {
      console.error('User denied access to MetaMask');
    }
  } else {
    window.web3 = new Web3((window.web3 && window.web3.currentProvider) || config.wsProvider);
  }

  ReactDOM.render(<Routes store={store} />, document.getElementById('root'));
};

window.addEventListener('load', startApp);
