import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'rc-progress';
import { connect } from 'react-redux';
import { calcDataForNextLevel } from '../../services/utils';
import { levelUpAsset } from '../../actions/gameplayActions';

import './GameplayItem.scss';

const GameplayItem = ({
  cards, isOver, index, activeLocationIndex, level, canLevelUp, levelUpAsset,
}) => {
  const { percent, remainingCardsToDropForNextLevel } = calcDataForNextLevel(cards.length, level);

  return (
    <div
      className={`
      gameplay-item-wrapper
      ${isOver && 'hovering'}
    `}
    >
      <div>{ cards[0].stats.title }</div>

      <div>Level: { level }</div>
      <Line strokeWidth="4" percent={percent} />
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
  );
};

GameplayItem.defaultProps = {
  cards: [],
  isOver: false,
};

GameplayItem.propTypes = {
  cards: PropTypes.array,
  isOver: PropTypes.bool,
  level: PropTypes.number.isRequired,
  canLevelUp: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  activeLocationIndex: PropTypes.number.isRequired,
  levelUpAsset: PropTypes.func.isRequired,
};

const mapStateToProps = ({ gameplay }) => ({
  activeLocationIndex: gameplay.activeLocationIndex,
});

const mapDispatchToProps = { levelUpAsset };

export default connect(mapStateToProps, mapDispatchToProps)(GameplayItem);
