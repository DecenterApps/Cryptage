import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Circle } from 'rc-progress';
import HoverInfo from '../HoverInfo/HoverInfo';
import { activateProject } from '../../actions/gameplayActions';
import { classForRarity, formatBigNumber } from '../../services/utils';
import ChevronDownIcon from '../Decorative/ChevronDownIcon';
import { openConfirmRemoveModal } from '../../actions/modalActions';
import { checkIfCanLevelUp } from '../../services/gameMechanicsService';
import PortalWrapper from '../PortalWrapper/PortalWrapper';
import ProjectItemVector from './ProjectItemVector';
import ProjectPill from './ProjectPill';

import './ProjectItem.scss';

import activeBg from './assets/active-item-bg.png';
import restart from './assets/restart.png';
import InfoCardIcon from '../Decorative/InfoCardIcon';
import DropCardIcon from '../Decorative/DropCardIcon';

const calculatePercent = (expiryTime, costTime) => ((expiryTime / costTime) * 100);

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
      card, slot, index, expiryTime, showFpb, activateProject, blockNumber,
      openConfirmRemoveModal, dragItem, gameplay, projectExecutionTimePercent,
      draggingCard,
    } = this.props;
    const isActive = card.running;
    const isFinished = card.timesFinished > 0;

    const draggingDuplicate = dragItem && (dragItem.card.metadataId === card.metadataId);
    const canLevelUp = draggingDuplicate && !isActive && slot.canDrop(gameplay, dragItem.card);
    const timeLeft = Math.floor((projectExecutionTimePercent / 100) * (expiryTime - blockNumber));

    return (
      <div
        className={`
          project-container
          ${canLevelUp ? 'level-up-success' : 'level-up-fail'}
          ${draggingDuplicate ? 'dragging-success' : 'dragging-fail'}
          rarity-border
          ${classForRarity(card.rarityScore)}
        `}
        ref={(ref) => { this.myRef = ref; }}
      >
        <div
          className={`projects-item-wrapper ${!isActive && isFinished && 'project-finished'}`}
        >
          {
            !draggingCard &&
            showPortal &&
            <PortalWrapper>
              <HoverInfo card={card} parent={this.myRef} type="project" />
            </PortalWrapper>
          }

          <ProjectItemVector active={isActive} id={card.id} image={`cardImages/${card.image}`} />

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
              <div className="project-pill-close">
                <DropCardIcon
                  onClick={() => {
                    openConfirmRemoveModal(undefined, undefined, undefined, undefined, card, index);
                  }}
                />
                <ProjectPill id={card.id} />
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

ProjectItem.defaultProps = {
  card: null,
  dragItem: null,
  draggingCard: false,
  expiryTime: null,
  showFpb: null,
};

ProjectItem.propTypes = {
  card: PropTypes.object,
  gameplay: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  showFpb: PropTypes.bool,
  activateProject: PropTypes.func.isRequired,
  openConfirmRemoveModal: PropTypes.func.isRequired,
  blockNumber: PropTypes.number.isRequired,
  expiryTime: PropTypes.number,
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
