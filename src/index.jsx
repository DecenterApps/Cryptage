import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import App from './components/App/App';
import store from './store';
import NoMetaMask from './components/NoMetaMask/NoMetaMask';

const startApp = () => {
  const hasMetaMask = typeof web3 !== 'undefined';

  if (hasMetaMask) window.web3 = new Web3(web3.currentProvider);

  if (!hasMetaMask) {
    ReactDOM.render(<NoMetaMask />, document.getElementById('root'));
  } else {
    ReactDOM.render(<div><App store={store} /></div>, document.getElementById('root'));
  }
};

window.addEventListener('load', startApp);
