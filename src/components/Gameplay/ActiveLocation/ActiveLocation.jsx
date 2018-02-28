import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './ActiveLocation.scss';

const ActiveLocation = ({ location }) => (
  <div className="active-location-wrapper">
    { location.id }
  </div>
);

ActiveLocation.propTypes = {
  location: PropTypes.object.isRequired,
};

export default connect(null, null)(ActiveLocation);
