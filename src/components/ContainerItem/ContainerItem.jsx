import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formattedNumber } from '../../services/utils';
import IngameCard from '../Cards/IngameCard/IngameCard';

import './ContainerItem.scss';

class ContainerItem extends Component {
  constructor() {
    super();
    this.state = { show: false };
    this.toggleFundsStat = this.toggleFundsStat.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.blockNumber === this.props.blockNumber) return false;
    this.toggleFundsStat();
    setTimeout(this.toggleFundsStat, 2000);
  }

  toggleFundsStat() {
    this.setState({ show: !this.state.show });
  }

  render() {
    const {
      index, card, locationIndex, containerIndex, slot, dragItem, gameplay
    } = this.props;

    const fpb = card ? card.getBonusStatValue('fundsPerBlock') : 0;

    const draggingDuplicate = dragItem && (dragItem.card.metadataId === card.metadataId);
    const canLevelUp = draggingDuplicate ? slot.canDrop(gameplay, dragItem.card).allowed : false;

    return (
      <div className="container-item-wrapper">
        {
          this.state.show &&
          (fpb > 0) &&
          <div className="fpb">+ { formattedNumber(fpb) } { fpb === 1 ? 'FUND' : 'FUNDS' }</div>
        }
        <IngameCard
          canLevelUp={canLevelUp}
          showCount={false}
          played
          card={card}
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
  card: null,
  dragItem: null,
};

ContainerItem.propTypes = {
  gameplay: PropTypes.object.isRequired,
  card: PropTypes.object,
  locationIndex: PropTypes.number.isRequired,
  containerIndex: PropTypes.number.isRequired,
  slot: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  blockNumber: PropTypes.number.isRequired,
  dragItem: PropTypes.object,
};

const mapStateToProps = ({ gameplay }) => ({
  gameplay,
  projects: [...gameplay.projectSlots],
  activeLocationIndex: gameplay.activeLocationIndex,
  blockNumber: gameplay.blockNumber,
});

export default connect(mapStateToProps)(ContainerItem);
