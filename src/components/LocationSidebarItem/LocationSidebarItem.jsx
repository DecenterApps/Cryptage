import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HoverInfo from '../HoverInfo/HoverInfo';
import { setActiveLocation, levelUpLocation, handleCardCancel } from '../../actions/gameplayActions';
import { GP_LOCATION } from '../../actions/actionTypes';
import { calcDataForNextLevel } from '../../services/utils';
import MagnifyingGlassIcon from '../Decorative/MagnifyingGlassIcon';
import ChevronDownIcon from '../Decorative/ChevronDownIcon';

import './LocationSidebarItem.scss';

const LocationSidebarItem = ({
  isOver, cards, slot, setActiveLocation, index, activeLocationIndex, gameplayView, level, canLevelUp, levelUpLocation,
  handleCardCancel,
}) => {
  const { percent, remainingCardsToDropForNextLevel } = calcDataForNextLevel(cards.length, level);
  console.log('AAAAA');
  console.log(slot);
  return (
    <div
      className={`
        location-sidebar-item-wrapper
        ${isOver && 'hovering-with-card'}
        ${((activeLocationIndex === index) && gameplayView === GP_LOCATION) && 'active'}
      `}
    >
      <HoverInfo card={cards[0]} center />
      <div className="hover-addons">
        <div className="magnifying-glass-wrapper" onClick={() => { setActiveLocation(index); }}>
          <MagnifyingGlassIcon />
        </div>
        <div className="drop-wrapper">
          <svg className="drop-background">
            <polygon points="0,0 29,29 29,46 0,46" fill="#1F1638" />
          </svg>
          <div className="drop-icon" onClick={() => { handleCardCancel(slot, index); }}>
            <ChevronDownIcon width={17} />
          </div>
        </div>
      </div>
      {
        ((activeLocationIndex === index) && gameplayView === GP_LOCATION) && false &&
        <svg className="location-progress-bar" viewBox="0 0 84 11">
          <defs>
            <clipPath id="location-sidebar-item-cut">
              <polygon points="78.2,9 71.2,2 2,2 2,9 " />
            </clipPath>
          </defs>
          <polygon className="progress-bar-outer" points="1,1 1,10 80,10 71,1" />
          <rect
            x="0"
            y="0"
            width={percent * 0.82}
            height="11"
            className="progress-bar"
            clipPath="url(#location-sidebar-item-cut)"
          />
        </svg>
      }
      <div
        className="location-sidebar-item-inner-wrapper"
        style={{ backgroundImage: `url('/cardImages/${cards[0].stats.image}')` }}
      >
        <div className="level-outer">
          <svg className="level-background">
            <defs>
              <linearGradient id={`sidebar-location-level-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#3CC8CC' }} />
                <stop offset="100%" style={{ stopColor: 'rgba(60, 200, 204, 0.33)' }} />
              </linearGradient>
            </defs>
            <polygon points="0,0 27,0 27,27" fill={`url(#sidebar-location-level-${index})`} />
          </svg>
          <span className="level">{level}</span>
        </div>
        <div className="title">{cards[0].stats.title}</div>
      </div>
      {
        !canLevelUp && false &&
        <div className="level-up-tip">
          Cards to drop for next level: {remainingCardsToDropForNextLevel}
        </div>
      }
      {
        canLevelUp && false &&
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
  handleCardCancel: PropTypes.func.isRequired,
  slot: PropTypes.object.isRequired,
};

const mapStateToProps = ({ gameplay }) => ({
  activeLocationIndex: gameplay.activeLocationIndex,
  gameplayView: gameplay.gameplayView,
});

const mapDispatchToProp = {
  setActiveLocation, levelUpLocation, handleCardCancel,
};

export default connect(mapStateToProps, mapDispatchToProp)(LocationSidebarItem);
