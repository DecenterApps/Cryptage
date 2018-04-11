import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '../CloseIcon/CloseIcon';

import './modals.scss';

const ModalHeader = ({ closeModal }) => (
  <div className="modal-header">
    <span
      onClick={closeModal}
      className="icon-close"
    >
      <CloseIcon />
    </span>
  </div>
);

ModalHeader.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ModalHeader;
