import React from 'react';
import PropTypes from 'prop-types';
import ModalHeader from '../ModalHeader';
import ModalBody from '../ModalBody';

const GoldModal = () => (
  <div>
    <ModalHeader title="test" />
    <ModalBody>
      Test
    </ModalBody>
  </div>
);

GoldModal.propTypes = {};

const mapStateToProps = () => ({});

export default GoldModal;
