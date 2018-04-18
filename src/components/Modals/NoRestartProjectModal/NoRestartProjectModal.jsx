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
        You can&#39;t currently restart this project. You don&#39;t have enough development.
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
