import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setActiveLocation } from '../../actions/gameplayActions';
import { GP_LOCATION } from '../../actions/actionTypes';

import './LocationSidebarItem.scss';

const LocationSidebarItem = ({
  isOver, cards, setActiveLocation, index, activeLocationIndex, gameplayView,
}) => (
  <div
    className={`
      location-sidebar-item-wrapper
      ${isOver && 'hovering-with-card'}
      ${((activeLocationIndex === index) && gameplayView === GP_LOCATION) && 'active'}
    `}
    onClick={() => { setActiveLocation(index); }}
  >
    Num stacked locations: { cards.length }
  </div>
);

LocationSidebarItem.defaultProps = {
  cards: [],
  isOver: false,
};

LocationSidebarItem.propTypes = {
  cards: PropTypes.array,
  isOver: PropTypes.bool,
  setActiveLocation: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  activeLocationIndex: PropTypes.number.isRequired,
  gameplayView: PropTypes.string.isRequired,
};

const mapStateToProps = ({ gameplay }) => ({
  activeLocationIndex: gameplay.activeLocationIndex,
  gameplayView: gameplay.gameplayView,
});

const mapDispatchToProp = {
  setActiveLocation,
};

export default connect(mapStateToProps, mapDispatchToProp)(LocationSidebarItem);
