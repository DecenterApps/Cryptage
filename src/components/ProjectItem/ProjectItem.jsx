import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Line, Circle } from 'rc-progress';
import { setActiveLocation, levelUpProject, activateProject } from '../../actions/gameplayActions';
import { GP_LOCATION } from '../../actions/actionTypes';
import { calcDataForNextLevel } from '../../services/utils';

import './ProjectItem.scss';

import activeBg from './assets/active-item-bg.png';

const calculatePercent = (expiryTime, costTime) => {
  console.log(expiryTime, costTime);
  console.log((expiryTime / costTime) * 100);
  return (expiryTime / costTime) * 100;
};

const ProjectItem = ({
  isOver, cards, index, gameplayView, level, canLevelUp, levelUpProject, isActive, expiryTime,
  activateProject, blockNumber,
}) => {
  const { percent, remainingCardsToDropForNextLevel } = calcDataForNextLevel(cards.length, level);

  return (
    <div
      className={`
      projects-item-wrapper
      ${isOver && 'hovering-with-card'}
    `}
    >
      {
        isActive ?
          <img className="project-thumbnail" src={activeBg} alt="" /> :
          <img className="project-thumbnail" src={`/cardImages/${cards[0].stats.image}`} alt="" />
      }

      <div className="project-info">
        {!isActive &&
        <button
          className="activate-button"
          onClick={() => activateProject(index)}
        >
          ON
        </button>
        }
        {
          isActive &&
          <div>
            <Circle
              strokeWidth="4"
              strokeColor="#FF9D14"
              trailColor="transparent"
              percent={calculatePercent(expiryTime - blockNumber, cards[0].stats.cost.time)}
            />
            <span className="project-time-left">
              <div className="blocks-left">{expiryTime - blockNumber}</div>
              <div>BLOCKS</div>
              <div>MORE</div>
            </span>
          </div>
        }
        {/*
      {cards[0].stats.title.substr(0, 10)}... (lvl{level})
      <Line strokeWidth="4" percent={percent} />
      {canLevelUp &&
      <button onClick={() => { levelUpProject(index); }}>Upgrade to next level</button>
      }
      */}
      </div>
    </div>
  );
};

ProjectItem.defaultProps = {
  cards: [],
  isOver: false,
};

ProjectItem.propTypes = {
  cards: PropTypes.array,
  isOver: PropTypes.bool,
  index: PropTypes.number.isRequired,
  gameplayView: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  canLevelUp: PropTypes.bool.isRequired,
  levelUpProject: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  activateProject: PropTypes.func.isRequired,
  blockNumber: PropTypes.number.isRequired,
  expiryTime: PropTypes.number,
};

ProjectItem.defaultProps = {
  expiryTime: null,
};

const mapStateToProps = ({ gameplay, app }) => ({
  gameplayView: gameplay.gameplayView,
  blockNumber: app.blockNumber,
});

const mapDispatchToProp = {
  setActiveLocation, levelUpProject, activateProject
};

export default connect(mapStateToProps, mapDispatchToProp)(ProjectItem);
