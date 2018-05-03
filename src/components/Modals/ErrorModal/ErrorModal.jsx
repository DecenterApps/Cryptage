import React from 'react';
import PropTypes from 'prop-types';
import ModalHeader from '../ModalHeader';
import ModalBody from '../ModalBody';

import '../ConfirmRemoveModal/ConfirmRemoveModal.scss';

const ErrorModal = ({ closeModal, errors }) => (
  <div className="confirm-modal-wrapper">
    <ModalHeader closeModal={closeModal} />
    <ModalBody>
      <h3 className="title">{errors.title}</h3>
      <div key="D" className="main-text">
        {errors.body}
      </div>
      <button key="E" className="orange-button" onClick={closeModal}>Close</button>
    </ModalBody>
  </div>
);

ErrorModal.defaultProps = {
};

ErrorModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default ErrorModal;
