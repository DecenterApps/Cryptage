import React from 'react';
import PropTypes from 'prop-types';
import SmallButton from '../../SmallButton/SmallButton';
import ModalBody from '../ModalBody';

import '../ConfirmRemoveModal/ConfirmRemoveModal.scss';

const NoRestartProjectModal = ({ closeModal, errors }) => (
  <div className="confirm-modal-wrapper">

    <div className="modal-bar" />
    <ModalBody>
      <h3 className="title">Restart project</h3>

      <div key="D" className="main-text">
        This project can&#39;t be restarted right now because you don&#39;t have enough available
        {errors.development && !errors.funds && <span className="conditional">development</span> }
        {!errors.development && errors.funds && <span className="conditional">funds</span> }
        {errors.development && errors.funds && <span className="conditional">funds and development</span> }
        .
      </div>
    </ModalBody>
    <div className="modal-bar" />

    <div className="buttons-wrapper">
      <div className="modal-buttons-bar" />

      <span onClick={closeModal}><SmallButton text="Close" /></span>
    </div>
  </div>
);

NoRestartProjectModal.defaultProps = {
};

NoRestartProjectModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default NoRestartProjectModal;
