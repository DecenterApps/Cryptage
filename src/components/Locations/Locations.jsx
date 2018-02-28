import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setActiveLocation } from '../../actions/locationActions';

import './Locations.scss';

const Locations = ({ locations, activeLocationIndex, setActiveLocation }) => (
  <div className="locations-wrapper">
    <div className="locations-header">
      Active locations
    </div>

    <div className="active-locations-wrapper">
      { locations.length === 0 && <div className="no-locations">You do not have any active locations.</div> }

      {
        locations.length > 0 &&
        <div className="locations-small-wrapper">
          {
            locations.map((location, index) => (
              <div
                className={`location ${(activeLocationIndex === index) && 'active'}`}
                onClick={() => { setActiveLocation(index); }}
                key={location.id}
              >
                { location.stats.title }, { location.id }
              </div>
            ))
          }
        </div>
      }
    </div>
  </div>
);

Locations.defaultProps = {
  activeLocationIndex: null,
};

Locations.propTypes = {
  setActiveLocation: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired,
  activeLocationIndex: PropTypes.number,
};

const mapStateToProps = ({ location }) => ({
  locations: location.locations,
  activeLocationIndex: location.activeLocationIndex,
});

const mapDispatchToProp = {
  setActiveLocation,
};

export default connect(mapStateToProps, mapDispatchToProp)(Locations);
