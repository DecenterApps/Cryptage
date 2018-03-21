import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Line } from 'rc-progress';
import { calcDataForNextLevel } from '../../services/utils';
import { levelUpContainedCard } from '../../actions/gameplayActions';

import './ContainerItem.scss';

const ContainerItem = ({
  cards, level, canLevelUp, locationIndex, containerIndex, index, levelUpContainedCard,
}) => {
  const { percent, remainingCardsToDropForNextLevel } = calcDataForNextLevel(cards.length, level);

  return (
    <div className="container-item-wrapper">
      <div>{ cards[0].stats.title }</div>

      <div>Level: { level }</div>
      <Line strokeWidth="4" percent={percent} />
      { !canLevelUp && <div>Cards to drop for next level: { remainingCardsToDropForNextLevel }</div> }
      {
        canLevelUp &&
        <button
          onClick={() => { levelUpContainedCard(locationIndex, containerIndex, index); }}
        >
          Upgrade to next level
        </button>
      }
    </div>
  );
};

ContainerItem.defaultProps = {
  cards: [],
  level: 1,
  index: 0,
  canLevelUp: false,
};

ContainerItem.propTypes = {
  cards: PropTypes.array,
  level: PropTypes.number,
  canLevelUp: PropTypes.bool,
  locationIndex: PropTypes.number.isRequired,
  containerIndex: PropTypes.number.isRequired,
  index: PropTypes.number,
  levelUpContainedCard: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  levelUpContainedCard,
};

export default connect(null, mapDispatchToProps)(ContainerItem);
