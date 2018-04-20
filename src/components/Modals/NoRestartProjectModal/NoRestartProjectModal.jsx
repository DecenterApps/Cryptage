import React from 'react';
import PropTypes from 'prop-types';
import ModalHeader from '../ModalHeader';
import ModalBody from '../ModalBody';

import '../ConfirmRemoveModal/ConfirmRemoveModal.scss';

const NoRestartProjectModal = ({ closeModal }) => (
  <div className="confirm-modal-wrapper">
    <ModalHeader closeModal={closeModal} />
    <ModalBody>
      <h3 className="title">Restart project</h3>

      <div key="D" className="main-text">
        This project can&#39;t be restarted right new because you don&#39;t have enough available development.
      </div>
      <button key="E" className="orange-button" onClick={closeModal}>Close</button>
    </ModalBody>
  </div>
);

NoRestartProjectModal.defaultProps = {
};

NoRestartProjectModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default NoRestartProjectModal;
