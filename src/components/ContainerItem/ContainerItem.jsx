import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IngameCard from '../Cards/IngameCard/IngameCard';

import './ContainerItem.scss';

class ContainerItem extends Component {
  // constructor() {
  //   super();
  //   this.state = { show: false };
  //
  //   this.toggleFundsStat = this.toggleFundsStat.bind(this);
  // }
  //
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.blockNumber === this.props.blockNumber) return;
  //
  //   this.toggleFundsStat();
  //   setTimeout(this.toggleFundsStat, 2000);
  // }
  //
  // /**
  //  * Shows or hides funds stats per block
  //  */
  // toggleFundsStat() {
  //   this.setState({ show: !this.state.show });
  // }

  render() {
    const {
      index, card, locationIndex, containerIndex, slot, dragItem, gameplay,
    } = this.props;
    // const fpb = card.funds;

    const draggingDuplicate = dragItem && (dragItem.card.metadataId === card.metadataId);
    const canLevelUp = draggingDuplicate && slot.canDrop(gameplay, dragItem.card);

    return (
      <div className={`
        container-item-wrapper
        ${canLevelUp ? 'level-up-success' : 'level-up-fail'}
        ${draggingDuplicate ? 'dragging-success' : 'dragging-fail'}
      `}
      >
        {/*{*/}
          {/*this.state.show && <div className="fpb">+ { fpb } { fpb === 1 ? 'FUND' : 'FUNDS' }</div>*/}
        {/*}*/}

        <IngameCard
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
