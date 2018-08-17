import React from 'react';
import PropTypes from 'prop-types';
import ModalBody from '../ModalBody';

import './MetamaskInstalledModal.scss';
import SmallButton from '../../SmallButton/SmallButton';

const MetamaskInstalledModal = ({ closeModal }) => (
  <div className="metamask-installed-wrapper">
    <div className="modal-bar" />
    <ModalBody>
      <h3 className="title">MetaMask installed!</h3>
      <p className="main-text">
        We&apos;ve connected your MetaMask account to your previous game state.
      </p>
    </ModalBody>
    <div className="modal-bar" />
    <div className="buttons-wrapper">
      <div className="modal-buttons-bar" />
      <span onClick={closeModal}><SmallButton text="Ok" /></span>
    </div>
  </div>
);

MetamaskInstalledModal.defaultProps = {};

MetamaskInstalledModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default MetamaskInstalledModal;
