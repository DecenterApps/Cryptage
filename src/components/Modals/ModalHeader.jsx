import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CloseIcon from '../CloseIcon/CloseIcon';
import { toggleModal } from '../../actions/modalActions';

import './modals.scss';

const ModalHeader = ({ toggleModal }) => (
  <div className="modal-header">
    <span
      onClick={() => { toggleModal('', {}, false); }}
      className="icon-close"
    >
      <CloseIcon />
    </span>
  </div>
);

ModalHeader.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  toggleModal,
};

export default connect(null, mapDispatchToProps)(ModalHeader);
