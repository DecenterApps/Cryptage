import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'rc-progress';
import { connect } from 'react-redux';
import { calcDataForNextLevel } from '../../services/utils';
import { levelUpAsset, handleMinerDropInContainer } from '../../actions/gameplayActions';
import DropSlotsWrapper from '../DropSlotsWrapper/DropSlotsWrapper';
import ContainerItem from '../ContainerItem/ContainerItem';
import { containerIds } from '../../actions/actionTypes';

import './GameplayItem.scss';

const GameplayItem = ({
  cards, isOver, index, activeLocationIndex, level, canLevelUp, levelUpAsset, dropSlots, handleMinerDropInContainer,
}) => {
  const { percent, remainingCardsToDropForNextLevel } = calcDataForNextLevel(cards.length, level);
  const isContainer = containerIds.includes(cards[0].metadata.id);
  console.log('dropSlots', dropSlots);
  return (
    <div
      className={`
        gameplay-item-wrapper
        ${isOver && 'hovering'}
      `}
      style={{ backgroundImage: `url('/cardImages/${cards[0].stats.image}')` }}
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

      {
        isContainer &&
        <div className="container-slots">
          <DropSlotsWrapper
            dropSlots={dropSlots}
            onItemDrop={(minerIndex, item) => {
              handleMinerDropInContainer(activeLocationIndex, index, minerIndex, item);
            }}
            element={<ContainerItem
              locationIndex={activeLocationIndex}
              containerIndex={index}
            />}
            mainClass="container-slot"
          />
        </div>
      }
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
  handleMinerDropInContainer: PropTypes.func.isRequired,
  dropSlots: PropTypes.array,
};

const mapStateToProps = ({ gameplay }) => ({
  activeLocationIndex: gameplay.activeLocationIndex,
});

const mapDispatchToProps = {
  levelUpAsset, handleMinerDropInContainer,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameplayItem);
