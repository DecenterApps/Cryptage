import React from 'react';
import PropTypes from 'prop-types';
import SmallButton from '../../SmallButton/SmallButton';

import '../ConfirmRemoveModal/ConfirmRemoveModal.scss';
import './MetamaskModal.scss';

const MetamaskModal = ({ closeModal, tried }) => (
  <div className="confirm-modal-wrapper">
    <div className="modal-warning-bar" />
    <div className="metamask-warning">
      <div className="metamask-warning-inner">
        <svg width="36" height="33" viewBox="0 0 36 33" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="36" height="33" fill="black" fillOpacity="0" />
          <rect width="36" height="33" fill="black" fillOpacity="0" />
          <rect width="36" height="33" fill="black" fillOpacity="0" />
          <path d="M17.9995 23.1898C16.9931 23.1898 16.1494 24.0357 16.1494 25.0449C16.1494 26.0542 16.9931 26.9001 17.9995 26.9001C18.9689 26.9001 19.8496 26.0542 19.8052 25.0895C19.8496 24.0283 19.0134 23.1898 17.9995 23.1898Z" fill="#FF9D14"/> {/* eslint-disable-line */}
          <path d="M35.124 29.7646C36.2858 27.7535 36.2932 25.3566 35.1388 23.353L23.5498 3.22802C22.4028 1.20216 20.3307 0 18.0069 0C15.6832 0 13.6111 1.20958 12.4641 3.2206L0.860326 23.3679C-0.294129 25.3937 -0.286728 27.8055 0.882528 29.8165C2.03698 31.8053 4.10168 33 6.41059 33H29.5589C31.8752 33 33.9547 31.7904 35.124 29.7646ZM32.6078 28.3101C31.964 29.4232 30.8244 30.0837 29.5515 30.0837H6.40319C5.14513 30.0837 4.01288 29.438 3.38385 28.3472C2.74742 27.2415 2.74002 25.9206 3.37645 24.8075L14.9802 4.66764C15.6092 3.56195 16.7341 2.90893 18.0069 2.90893C19.2724 2.90893 20.4047 3.56937 21.0337 4.67506L32.63 24.8149C33.2517 25.8984 33.2443 27.2044 32.6078 28.3101Z" fill="#FF9D14"/> {/* eslint-disable-line */}
          <path d="M17.5406 10.1664C16.6599 10.4187 16.1123 11.2201 16.1123 12.1922C16.1567 12.7785 16.1937 13.3721 16.2381 13.9584C16.3639 16.192 16.4897 18.3811 16.6155 20.6148C16.6599 21.3717 17.2446 21.9208 17.9994 21.9208C18.7542 21.9208 19.3463 21.3346 19.3833 20.5703C19.3833 20.1102 19.3833 19.6872 19.4277 19.2197C19.5091 17.7875 19.5979 16.3553 19.6793 14.9231C19.7237 13.9955 19.8051 13.0679 19.8495 12.1403C19.8495 11.8064 19.8051 11.5095 19.6793 11.2127C19.3019 10.3816 18.4212 9.95861 17.5406 10.1664Z" fill="#FF9D14"/> {/* eslint-disable-line */}
        </svg>
        <p>
          It appears you don&apos;t have{' '}
          <a target="_blank" rel="noopener noreferrer" href="https://metamask.io/">MetaMask</a>
          {' '}installed.
          You need it in order to { tried }.
          You can still play the game but for the complete experience we recommend
          installing MetaMask.
          Make sure to reload this page after installing it.
        </p>
        <h3>What is MetaMask?</h3>
        <p>
          MetaMask extension acts as a bridge between your browser and Ethereum blockchain
          and therefore you won’t be able to buy card packs or save game state on the
          blockchain without it. MetaMask manages your Ethereum accounts which identify you on
          the leaderboard and own your purchased and redeemed in-game assets.
        </p>
        <h3><a target="_blank" rel="noopener noreferrer" href="https://metamask.io/">Get MetaMask</a></h3>
      </div>
    </div>
    <div className="modal-warning-bar" />

    <div className="buttons-wrapper">
      <div className="modal-buttons-bar" />

      <span onClick={closeModal}><SmallButton text="Close" /></span>
    </div>
  </div>
);

MetamaskModal.defaultProps = {
};

MetamaskModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  tried: PropTypes.string.isRequired,
};

export default MetamaskModal;
