import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Circle } from 'rc-progress';
import HoverInfo from '../HoverInfo/HoverInfo';
import { activateProject, } from '../../actions/gameplayActions';
import { classForRarity, formatBigNumber } from '../../services/utils';
import ChevronDownIcon from '../Decorative/ChevronDownIcon';
import { openConfirmRemoveModal } from '../../actions/modalActions';
import { checkIfCanLevelUp } from '../../services/gameMechanicsService';
import PortalWrapper from '../PortalWrapper/PortalWrapper';

import './ProjectItem.scss';

import activeBg from './assets/active-item-bg.png';
import restart from './assets/restart.png';

const calculatePercent = (expiryTime, costTime) => 100 - ((expiryTime / costTime) * 100);

class ProjectItem extends Component {
  constructor() {
    super();
    this.state = { showPortal: false };

    this.togglePortal = this.togglePortal.bind(this);
  }

  togglePortal(showOrHide) { this.setState({ showPortal: showOrHide }); }

  render() {
    const { togglePortal } = this;
    const { showPortal } = this.state;
    const {
      mainCard, index, isActive, expiryTime, showFpb, activateProject, blockNumber, isFinished,
      openConfirmRemoveModal, modifiedFundsBonus, dragItem, globalStats, projectExecutionTimePercent,
      draggingCard,
    } = this.props;

    const draggingDuplicate = dragItem && (dragItem.card.metadata.id === mainCard.metadata.id);
    const canLevelUp = draggingDuplicate && !isActive && checkIfCanLevelUp(mainCard, globalStats);

    let timeLeft = Math.floor((projectExecutionTimePercent / 100) * (expiryTime - blockNumber));
    // remove when refactor is over
    if (timeLeft < 0) timeLeft = 1;

    const cardFundsBonus = mainCard.stats.bonus.funds;
    const metadataId = mainCard.metadata.id;
    let fpb = 0;

    if (metadataId === '30' || metadataId === '27' || metadataId === '29' || metadataId === '37' || metadataId === '24') fpb = modifiedFundsBonus; // eslint-disable-line
    else fpb = cardFundsBonus;

    const xpb = mainCard.stats.bonus.xp;

    const alteredMainCard = JSON.parse(JSON.stringify(mainCard));

    if (metadataId === '37' || metadataId === '24') alteredMainCard.stats.bonus.funds = modifiedFundsBonus;

    return (
      <div
        className={`
          project-container
          ${canLevelUp ? 'level-up-success' : 'level-up-fail'}
          ${draggingDuplicate ? 'dragging-success' : 'dragging-fail'}
        `}
        onMouseEnter={() => { togglePortal(true); }}
        onMouseLeave={() => { togglePortal(false); }}
        ref={(ref) => { this.myRef = ref; }}
      >
        <div
          className={`projects-item-wrapper ${!isActive && isFinished && 'project-finished'}`}
        >
          {
            !draggingCard &&
            showPortal &&
            <PortalWrapper>
              <HoverInfo card={alteredMainCard} parent={this.myRef} type="project" />
            </PortalWrapper>
          }

          {
            showFpb &&
            <div className="bonus">
              {
                (xpb > 0) && <div>+ { formatBigNumber(xpb) } <br /> XP</div>
              }
              {
                (metadataId === '26' || metadataId === '27') &&
                (fpb > 0) &&
                <div>+ { formatBigNumber(fpb) } <br /> FPB</div>
              }
              {
                (metadataId !== '26' && metadataId !== '27') &&
                (fpb > 0) &&
                <div>+ { formatBigNumber(fpb) } <br /> { fpb === 1 ? 'FUND' : 'FUNDS' }</div>
              }
            </div>
          }

          {
            !isActive && isFinished &&
            <div className="repeat-project">
              <img
                draggable={false}
                className="project-check"
                src={restart}
                onClick={() => activateProject(mainCard, index)}
                alt="Checkmark icon"
              />
              <ChevronDownIcon onClick={() => {
                openConfirmRemoveModal(undefined, undefined, undefined, undefined, mainCard, index);
              }}
              />
            </div>
          }
          <img
            draggable={false}
            className="project-thumbnail main-thumbnail"
            src={`cardImages/${mainCard.stats.image}`}
            alt=""
          />
          <div className={`rarity-border ${classForRarity(mainCard.stats.rarityScore)}`} >
            <div className="helper" />
          </div>
          <div className="project-info">
            {
              isActive &&
              <div className="project-progress">
                <Circle
                  strokeWidth="5"
                  strokeColor="#FF9D14"
                  trailColor="transparent"
                  percent={calculatePercent(timeLeft, mainCard.stats.cost.time)}
                />
                <span className="project-time-left">
              <img className="project-thumbnail" src={activeBg} alt="" draggable={false} />
                  {
                    blockNumber > 0 && [
                      <div key="PIK1" className="blocks-left">{ timeLeft }</div>,
                      <div key="PIK2">{ ((timeLeft) === 1) ? 'BLOCK' : 'BLOCKS' }</div>,
                      <div key="PIK3">LEFT</div>,
                    ]
                  }

                  { blockNumber === 0 && <div className="loading-blocks">Loading...</div> }
            </span>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

ProjectItem.defaultProps = {
  mainCard: null,
  dragItem: null,
  draggingCard: false,
};

ProjectItem.propTypes = {
  mainCard: PropTypes.object,
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  isFinished: PropTypes.bool.isRequired,
  showFpb: PropTypes.bool,
  activateProject: PropTypes.func.isRequired,
  openConfirmRemoveModal: PropTypes.func.isRequired,
  blockNumber: PropTypes.number.isRequired,
  expiryTime: PropTypes.number,
  modifiedFundsBonus: PropTypes.number.isRequired,
  dragItem: PropTypes.object,
  globalStats: PropTypes.object.isRequired,
  projectExecutionTimePercent: PropTypes.number.isRequired,
  draggingCard: PropTypes.bool,
};

ProjectItem.defaultProps = {
  expiryTime: null,
  showFpb: null,
};

const mapStateToProps = ({ gameplay, app }) => ({
  gameplayView: gameplay.gameplayView,
  blockNumber: gameplay.blockNumber,
  globalStats: gameplay.globalStats,
  projectExecutionTimePercent: gameplay.projectExecutionTimePercent,
  draggingCard: app.draggingCard,
});

const mapDispatchToProp = {
  activateProject, openConfirmRemoveModal,
};

export default connect(mapStateToProps, mapDispatchToProp)(ProjectItem);
