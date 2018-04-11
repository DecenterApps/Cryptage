import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from './Modal';
import modalTypes from './modalTypes';

const ModalRoot = ({
  SpecificModal, modalProps, modalType, modalOpen,
}) => (
  <Modal modalOpen={modalOpen}>
    {
      SpecificModal ?
        <SpecificModal
          modalType={modalType}
          {...modalProps}
        /> : null
    }
  </Modal>
);

ModalRoot.defaultProps = {
  SpecificModal: null,
};

ModalRoot.propTypes = {
  modalProps: PropTypes.object.isRequired,
  modalType: PropTypes.string.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  SpecificModal: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
};

const mapStateToProps = ({ modal }) => ({
  modalProps: modal.modalProps,
  modalOpen: modal.modalType.length > 0,
  SpecificModal: modalTypes[modal.modalType],
  modalType: modal.modalType,
});

export default connect(mapStateToProps)(ModalRoot);
