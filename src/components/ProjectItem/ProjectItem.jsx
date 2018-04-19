import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Circle } from 'rc-progress';
import HoverInfo from '../HoverInfo/HoverInfo';
import {
  setActiveLocation,
  levelUpProject,
  activateProject,
} from '../../actions/gameplayActions';
import { calcDataForNextLevel, formatBigNumber } from '../../services/utils';
import ChevronDownIcon from '../Decorative/ChevronDownIcon';
import { openConfirmRemoveModal } from '../../actions/modalActions';

import './ProjectItem.scss';

import activeBg from './assets/active-item-bg.png';
import restart from './assets/restart.png';

const calculatePercent = (expiryTime, costTime) => 100 - ((expiryTime / costTime) * 100);

const ProjectItem = ({
  isOver, cards, index, level, isActive, expiryTime, showFpb, activateProject, blockNumber, isFinished,
  openConfirmRemoveModal,
}) => {
  const { percent, remainingCardsToDropForNextLevel } = calcDataForNextLevel(cards.length, level);
  const fpb = cards[0].stats.bonus.funds;
  const xpb = cards[0].stats.bonus.xp;

  return (
    <div
      className={`
      projects-item-wrapper
      ${isOver && 'hovering-with-card'}
      ${!isActive && isFinished && 'project-finished'}
    `}
    >
      <HoverInfo card={cards[0]} center />

      {
        showFpb &&
        <div className="bonus">
          <div>+ { formatBigNumber(xpb) } <br /> EXP</div>
          <div>+ { formatBigNumber(fpb) } <br /> { fpb === 1 ? 'FUND' : 'FUNDS' }</div>
        </div>
      }

      {
        !isActive && isFinished &&
        <div className="repeat-project">
          <img
            className="project-check"
            src={restart}
            onClick={() => activateProject(cards[0], index)}
            alt="Checkmark icon"
          />
          <ChevronDownIcon onClick={() => {
            openConfirmRemoveModal(undefined, undefined, undefined, undefined, cards[0], index);
          }}
          />
        </div>
      }
      <img
        className="project-thumbnail main-thumbnail"
        src={`cardImages/${cards[0].stats.image}`}
        alt=""
      />
      <div className="project-info">
        {
          isActive &&
          <div className="project-progress">
            <Circle
              strokeWidth="5"
              strokeColor="#FF9D14"
              trailColor="transparent"
              percent={calculatePercent(expiryTime - blockNumber, cards[0].stats.cost.time)}
            />
            <span className="project-time-left">
              <img className="project-thumbnail" src={activeBg} alt="" />
              {
                blockNumber > 0 && [
                  <div key="PIK1" className="blocks-left">{ expiryTime - blockNumber }</div>,
                  <div key="PIK2">{ ((expiryTime - blockNumber) === 1) ? 'BLOCK' : 'BLOCKS' }</div>,
                  <div key="PIK3">LEFT</div>,
                ]
              }

              { blockNumber === 0 && <div className="loading-blocks">Loading...</div> }
            </span>
          </div>
        }
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
  level: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  isFinished: PropTypes.bool.isRequired,
  showFpb: PropTypes.bool,
  activateProject: PropTypes.func.isRequired,
  openConfirmRemoveModal: PropTypes.func.isRequired,
  blockNumber: PropTypes.number.isRequired,
  expiryTime: PropTypes.number,
};

ProjectItem.defaultProps = {
  expiryTime: null,
  showFpb: null,
};

const mapStateToProps = ({ gameplay, app }) => ({
  gameplayView: gameplay.gameplayView,
  blockNumber: app.blockNumber,
});

const mapDispatchToProp = {
  setActiveLocation, levelUpProject, activateProject, openConfirmRemoveModal,
};

export default connect(mapStateToProps, mapDispatchToProp)(ProjectItem);
