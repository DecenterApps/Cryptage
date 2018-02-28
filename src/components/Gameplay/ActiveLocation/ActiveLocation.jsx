import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './ActiveLocation.scss';

const ActiveLocation = ({ location }) => (
  <div className="active-location-wrapper">
    <div className="active-location-header">
      <div className="location-stats-label">Location stats:</div>
      <div className="location-stats-wrapper">
        Space: 0
      </div>
    </div>

    { location.id }
  </div>
);

ActiveLocation.propTypes = {
  location: PropTypes.object.isRequired,
};

export default connect(null, null)(ActiveLocation);
