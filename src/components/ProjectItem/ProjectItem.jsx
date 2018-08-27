import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Circle } from 'rc-progress';
import HoverInfo from '../HoverInfo/HoverInfo';
import { activateProject } from '../../actions/gameplayActions';
import { classForRarity, formattedNumber } from '../../services/utils';
import { openConfirmRemoveModal } from '../../actions/modalActions';
import { calcExpiryBlocksLeft } from '../../services/gameMechanicsService';
import PortalWrapper from '../PortalWrapper/PortalWrapper';
import ProjectItemVector from './ProjectItemVector';
import ProjectPill from './ProjectPill';

import './ProjectItem.scss';

import restart from './assets/restart.png';
import InfoCardIcon from '../Decorative/InfoCardIcon';
import DropCardIcon from '../Decorative/DropCardIcon';

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
      card, slot, index, activateProject, blockNumber,
      openConfirmRemoveModal, dragItem, gameplay, projectExecutionTimePercent,
      draggingCard
    } = this.props;
    const isActive = card.running;
    const isFinished = card.timesFinished > 0;

    const draggingDuplicate = dragItem && (dragItem.card.metadataId === card.metadataId);
    const canLevelUp = draggingDuplicate && !isActive && slot.canDrop(gameplay, dragItem.card);
    const timeLeft = calcExpiryBlocksLeft(card, blockNumber, projectExecutionTimePercent);

    const xpb = card.getGainsStatValue('experience');
    const fpb = card.getGainsStatValue('fundsPerBlock');
    const funds = card.getGainsStatValue('funds');

    return (
      <div
        className={`
          project-container
          ${canLevelUp ? 'level-up-success' : 'level-up-fail'}
          ${draggingDuplicate ? 'dragging-success' : 'dragging-fail'}
          rarity-border
          ${classForRarity(card.rarityScore)}
        `}
      >
        <div
          className={`projects-item-wrapper ${!isActive && isFinished && 'project-finished'}`}
        >
          {
            !draggingCard &&
            showPortal &&
            <PortalWrapper>
              <HoverInfo card={card} center backdrop />
            </PortalWrapper>
          }

          <ProjectItemVector active={isActive} id={card.id} image={`cardImages/${card.image}`} />

          {
            (card.finishedNow && !isActive && isFinished) &&
            <div className="bonus">
              { (xpb > 0) && <div>+ { formattedNumber(xpb) } XP</div> }
              { (fpb > 0) && <div>+ { formattedNumber(fpb) } FPB</div> }
              { (funds > 0) && <div>+ { formattedNumber(funds) } { funds === 1 ? 'FUND' : 'FUNDS' }</div> }
            </div>
          }

          {
            isActive &&
            <div className="project-progress">
              <Circle
                strokeWidth="7"
                strokeColor="#FF9D14"
                trailColor="transparent"
                percent={calculatePercent(timeLeft, card.cost.time)}
              />
            </div>
          }

          {
            !isActive && isFinished &&
            <div className="repeat-project" onClick={() => activateProject(card, index)}>
              <img
                draggable={false}
                className="project-check"
                src={restart}
                alt="Repeat icon"
              />
            </div>
          }

          <div className="actions">
            <div
              className="project-pill-info"
              onMouseEnter={() => { togglePortal(true); }}
              onMouseLeave={() => { togglePortal(false); }}
            >
              <InfoCardIcon />
              <ProjectPill id={card.id} />
            </div>

            {
              !isActive &&
              <div
                className="project-pill-close"
                onClick={() => {
                  openConfirmRemoveModal(slot, undefined, undefined, undefined, card, index);
                }}
              >
                <DropCardIcon />
                <ProjectPill id={card.id} />
              </div>
            }
          </div>

        </div>
        {
          timeLeft > 0 &&
          <div className="blocks-left">{ timeLeft } <span>blocks left</span></div>
        }
      </div>
    );
  }
}

ProjectItem.defaultProps = {
  card: null,
  dragItem: null,
  draggingCard: false,
};

ProjectItem.propTypes = {
  card: PropTypes.object,
  gameplay: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  activateProject: PropTypes.func.isRequired,
  openConfirmRemoveModal: PropTypes.func.isRequired,
  blockNumber: PropTypes.number.isRequired,
  dragItem: PropTypes.object,
  projectExecutionTimePercent: PropTypes.number.isRequired,
  draggingCard: PropTypes.bool,
  slot: PropTypes.object.isRequired,
};

const mapStateToProps = ({ gameplay, app }) => ({
  gameplay,
  gameplayView: gameplay.gameplayView,
  blockNumber: gameplay.blockNumber,
  projectExecutionTimePercent: gameplay.projectExecutionTimePercent,
  draggingCard: app.draggingCard,
});

const mapDispatchToProp = {
  activateProject, openConfirmRemoveModal,
};

export default connect(mapStateToProps, mapDispatchToProp)(ProjectItem);