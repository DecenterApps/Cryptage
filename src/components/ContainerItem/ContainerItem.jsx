import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IngameCard from '../Cards/IngameCard/IngameCard';
import { checkIfCanLevelUp } from '../../services/gameMechanicsService';

import './ContainerItem.scss';

class ContainerItem extends Component {
  constructor() {
    super();
    this.state = { show: false };

    this.toggleFundsStat = this.toggleFundsStat.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.blockNumber === this.props.blockNumber) return;

    this.toggleFundsStat();
    setTimeout(this.toggleFundsStat, 2000);
  }

  /**
   * Shows or hides funds stats per block
   */
  toggleFundsStat() {
    this.setState({ show: !this.state.show });
  }

  render() {
    const {
      index, mainCard, locationIndex, containerIndex, slot, dragItem, globalStats,
    } = this.props;
    const fpb = mainCard.stats.bonus.funds;

    const draggingDuplicate = dragItem && (dragItem.card.metadata.id === mainCard.metadata.id);
    const canLevelUp = draggingDuplicate && checkIfCanLevelUp(mainCard, globalStats);

    return (
      <div className={`
        container-item-wrapper
        ${canLevelUp ? 'level-up-success' : 'level-up-fail'}
        ${draggingDuplicate ? 'dragging-success' : 'dragging-fail'}
      `}
      >
        {
          this.state.show && <div className="fpb">+ { fpb } { fpb === 1 ? 'FUND' : 'FUNDS' }</div>
        }

        <IngameCard
          showCount={false}
          played
          card={mainCard}
          slot={slot}
          locationIndex={locationIndex}
          containerIndex={containerIndex}
          containerSlotIndex={index}
        />
      </div>
    );
  }
}

ContainerItem.defaultProps = {
  mainCard: null,
  dragItem: null,
};

ContainerItem.propTypes = {
  mainCard: PropTypes.object,
  locationIndex: PropTypes.number.isRequired,
  containerIndex: PropTypes.number.isRequired,
  slot: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  blockNumber: PropTypes.number.isRequired,
  globalStats: PropTypes.object.isRequired,
  dragItem: PropTypes.object,
};

const mapStateToProps = ({ gameplay }) => ({
  projects: gameplay.projects,
  activeLocationIndex: gameplay.activeLocationIndex,
  blockNumber: gameplay.blockNumber,
  globalStats: gameplay.globalStats,
});

export default connect(mapStateToProps)(ContainerItem);
