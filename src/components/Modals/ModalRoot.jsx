import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from './Modal';
import modalTypes from './modalTypes';
import { closeModal } from '../../actions/modalActions';

const ModalRoot = ({
  SpecificModal, modalProps, modalType, modalOpen, closeModal,
}) => (
  <Modal modalOpen={modalOpen} closeModal={closeModal} width={modalProps.width} className={modalProps.className} >
    {
      SpecificModal ?
        <SpecificModal
          modalType={modalType}
          closeModal={closeModal}
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
  closeModal: PropTypes.func.isRequired,
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

const mapDispatchtoProps = {
  closeModal,
};

export default connect(mapStateToProps, mapDispatchtoProps)(ModalRoot);
