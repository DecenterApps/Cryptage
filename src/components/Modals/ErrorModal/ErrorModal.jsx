import React from 'react';
import PropTypes from 'prop-types';
import ModalBody from '../ModalBody';

import '../ConfirmRemoveModal/ConfirmRemoveModal.scss';
import SmallButton from '../../SmallButton/SmallButton';

const ErrorModal = ({ closeModal, errors }) => (
  <div className="confirm-modal-wrapper">

    <div className="modal-warning-bar" />
    <ModalBody>
      <h3 className="title">{errors.title}</h3>
      <div key="D" className="main-text">
        {errors.body}
      </div>
    </ModalBody>
    <div className="modal-warning-bar" />

    <div className="buttons-wrapper">
      <div className="modal-buttons-bar" />

      <span onClick={closeModal}><SmallButton text="Close" /></span>
    </div>
  </div>
);

ErrorModal.defaultProps = {
};

ErrorModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default ErrorModal;
