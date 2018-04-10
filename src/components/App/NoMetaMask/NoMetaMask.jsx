import React from 'react';
import PropTypes from 'prop-types';

import './NoMetaMask.scss';
import metaMaskLogo from './metamask.png';

const NoMetaMask = ({ accountError }) => (
  <div className="no-meta-mask-wrapper">
    <div className="welcome-text">Welcome to the world of</div>

    <img src={metaMaskLogo} alt="MetaMask logo" />
    <div className="main-text">{ accountError }</div>
    <a
      href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
      target="_blank"
      rel="noopener noreferrer"
      className="secondary-text"
    >
      HOW TO <br /> Get Chrome Extension
    </a>
  </div>
);

NoMetaMask.propTypes = {
  accountError: PropTypes.string.isRequired,
};

export default NoMetaMask;
