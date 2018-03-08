import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Line } from 'rc-progress';
import { setActiveLocation, levelUpLocation } from '../../actions/gameplayActions';
import { GP_LOCATION } from '../../actions/actionTypes';
import { calcDataForNextLevel } from '../../services/utils';

import './LocationSidebarItem.scss';

const LocationSidebarItem = ({
  isOver, cards, setActiveLocation, index, activeLocationIndex, gameplayView, level, canLevelUp, levelUpLocation,
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
      { !canLevelUp && <div>Cards to drop for next level: { remainingCardsToDropForNextLevel }</div> }
      { canLevelUp && <button onClick={() => { levelUpLocation(index); }}>Upgrade to next level</button> }
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
  canLevelUp: PropTypes.bool.isRequired,
  levelUpLocation: PropTypes.func.isRequired,
};

const mapStateToProps = ({ gameplay }) => ({
  activeLocationIndex: gameplay.activeLocationIndex,
  gameplayView: gameplay.gameplayView,
});

const mapDispatchToProp = {
  setActiveLocation, levelUpLocation,
};

export default connect(mapStateToProps, mapDispatchToProp)(LocationSidebarItem);
