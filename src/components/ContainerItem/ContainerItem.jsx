import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HandCard from '../Cards/HandCard/HandCard';

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
      index, cards, locationIndex, containerIndex, slot,
    } = this.props;
    const fpb = cards[0].stats.bonus.funds;

    return (
      <div className="container-item-wrapper">
        {
          this.state.show && <div className="fpb">+ { fpb } { fpb === 1 ? 'FUND' : 'FUNDS' }</div>
        }

        <HandCard
          showCount={false}
          played
          card={cards[0]}
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
  cards: [],
};

ContainerItem.propTypes = {
  cards: PropTypes.array,
  locationIndex: PropTypes.number.isRequired,
  containerIndex: PropTypes.number.isRequired,
  slot: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  blockNumber: PropTypes.number.isRequired,
};

const mapStateToProps = ({ gameplay }) => ({
  projects: gameplay.projects,
  activeLocationIndex: gameplay.activeLocationIndex,
  blockNumber: gameplay.blockNumber,
});

export default connect(mapStateToProps)(ContainerItem);
