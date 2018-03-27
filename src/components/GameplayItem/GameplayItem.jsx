import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'rc-progress';
import { connect } from 'react-redux';
import HandCard from '../Cards/HandCard/HandCard';
import { calcDataForNextLevel } from '../../services/utils';
import { levelUpAsset, switchInGameplayView } from '../../actions/gameplayActions';
import { containerIds, GP_LOCATION_CONTAINER } from '../../actions/actionTypes';

import './GameplayItem.scss';

const GameplayItem = ({
  cards, isOver, index, activeLocationIndex, level, canLevelUp, levelUpAsset, switchInGameplayView,
}) => {
  const { percent, remainingCardsToDropForNextLevel } = calcDataForNextLevel(cards.length, level);
  const isContainer = containerIds.includes(cards[0].metadata.id);

  return (
    <div
      className={`
        gameplay-item-wrapper
        ${isOver && 'hovering'}
        ${isContainer && 'container'}
      `}
      onClick={() => {
        if (!isContainer) return;
        switchInGameplayView(index, GP_LOCATION_CONTAINER);
      }}
    >
      <HandCard card={cards[0]} />
      <div className="level-up">
        { !canLevelUp && <div>Cards to drop for next level: { remainingCardsToDropForNextLevel }</div> }
        {
          canLevelUp &&
          <button
            onClick={() => { levelUpAsset(activeLocationIndex, index); }}
          >
            Upgrade to next level
          </button>
        }
      </div>
    </div>
  );
};

GameplayItem.defaultProps = {
  cards: [],
  isOver: false,
  dropSlots: null,
};

GameplayItem.propTypes = {
  cards: PropTypes.array,
  isOver: PropTypes.bool,
  level: PropTypes.number.isRequired,
  canLevelUp: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  activeLocationIndex: PropTypes.number.isRequired,
  levelUpAsset: PropTypes.func.isRequired,
  switchInGameplayView: PropTypes.func.isRequired,
  dropSlots: PropTypes.array,
};

const mapStateToProps = ({ gameplay }) => ({
  activeLocationIndex: gameplay.activeLocationIndex,
});

const mapDispatchToProps = {
  levelUpAsset, switchInGameplayView,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameplayItem);
