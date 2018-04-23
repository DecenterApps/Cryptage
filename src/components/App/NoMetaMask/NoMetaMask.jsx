import React from 'react';
import PropTypes from 'prop-types';

import './NoMetaMask.scss';
import metaMaskLogo from './metamask.png';

const NoMetaMask = ({ accountError }) => (
  <div className="no-meta-mask-wrapper">
    <div className="welcome-text">Welcome to Cryptage</div>

    <img src={metaMaskLogo} alt="MetaMask logo" />
    {
      accountError &&
      <div className="main-text">{ accountError }</div>
    }
    {
      !accountError &&
      <div className="main-text">You&apos;ll need MetaMask to play</div>
    }
    {
      !accountError &&
      <a
        href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
        target="_blank"
        rel="noopener noreferrer"
        className="secondary-text"
      >
        Get Chrome Extension
      </a>
    }
  </div>
);

NoMetaMask.propTypes = {
  accountError: PropTypes.string,
};

NoMetaMask.defaultProps = {
  accountError: '',
};

export default NoMetaMask;
