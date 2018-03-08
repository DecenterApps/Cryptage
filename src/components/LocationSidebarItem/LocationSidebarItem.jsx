import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Line } from 'rc-progress';
import { setActiveLocation } from '../../actions/gameplayActions';
import { GP_LOCATION } from '../../actions/actionTypes';
import { calcDataForNextLevel } from '../../services/utils';

import './LocationSidebarItem.scss';

const LocationSidebarItem = ({
  isOver, cards, setActiveLocation, index, activeLocationIndex, gameplayView, level,
}) => {
  const { percent, remainingCardsToDropForNextLevel } = calcDataForNextLevel(cards.length, level);

  return (
    <div
      className={`
      location-sidebar-item-wrapper
      ${isOver && 'hovering-with-card'}
      ${((activeLocationIndex === index) && gameplayView === GP_LOCATION) && 'active'}
    `}
      onClick={() => { setActiveLocation(index); }}
    >
      <div>{ cards[0].stats.title }</div>
      <div>Level: { level }</div>

      <Line strokeWidth="4" percent={percent} />
      Cards to drop for next level: { remainingCardsToDropForNextLevel }
    </div>
  );
};

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
  level: PropTypes.number.isRequired,
};

const mapStateToProps = ({ gameplay }) => ({
  activeLocationIndex: gameplay.activeLocationIndex,
  gameplayView: gameplay.gameplayView,
});

const mapDispatchToProp = {
  setActiveLocation,
};

export default connect(mapStateToProps, mapDispatchToProp)(LocationSidebarItem);
