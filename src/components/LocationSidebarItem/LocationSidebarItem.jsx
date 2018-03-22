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
      <svg className="location-progress-bar" viewBox="0 0 84 11">
        <defs>
          <clipPath id="cut">
            <polygon points="78.2,9 71.2,2 2,2 2,9 " />
          </clipPath>
        </defs>
        <polygon className="progress-bar-outer" points="1,1 1,10 80,10 71,1" />
        <rect x="0" y="0" width={percent * 0.82} height="11" className="progress-bar" clipPath="url(#cut)" />
      </svg>
      <div
        className="location-sidebar-item-inner-wrapper"
        style={{ backgroundImage: `url('/cardImages/${cards[0].stats.image}')` }}
      >
        <div className="level-outer">
          <span className="level">{level}</span>
        </div>
        <div className="title">{cards[0].stats.title}</div>
      </div>
      {
        !canLevelUp &&
        <div className="level-up-tip">
          Cards to drop for next level: {remainingCardsToDropForNextLevel}
        </div>
      }
      {
        canLevelUp &&
        <button
          className="level-up-button"
          onClick={() => { levelUpLocation(index); }}
        >
          Upgrade to next level
        </button>
      }
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
