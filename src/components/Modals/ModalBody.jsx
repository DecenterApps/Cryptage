import React from 'react';
import PropTypes from 'prop-types';

import './modals.scss';

const ModalBody = ({ children }) => (
  <div className="modal-body">
    { children }
  </div>
);

ModalBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalBody;
