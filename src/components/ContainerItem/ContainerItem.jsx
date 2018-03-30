import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HandCard from '../Cards/HandCard/HandCard';

import './ContainerItem.scss';
import { handleCardCancel } from '../../actions/gameplayActions';

const ContainerItem = ({ index, cards, locationIndex, containerIndex, slot, handleCardCancel }) => (
  <div className="container-item-wrapper">
    <HandCard
      showCount={false}
      played
      card={cards[0]}
      slot={slot}
      handleCardCancel={handleCardCancel}
      locationIndex={locationIndex}
      containerIndex={containerIndex}
      containerSlotIndex={index}
    />
  </div>
);

ContainerItem.defaultProps = {
  cards: [],
};

ContainerItem.propTypes = {
  cards: PropTypes.array,
  locationIndex: PropTypes.number.isRequired,
  containerIndex: PropTypes.number.isRequired,
  slot: PropTypes.object.isRequired,
  handleCardCancel: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

const mapStateToProps = ({ gameplay }) => ({
  projects: gameplay.projects,
  activeLocationIndex: gameplay.activeLocationIndex,
});

const mapDispatchToProp = {
  handleCardCancel,
};

export default connect(mapStateToProps, mapDispatchToProp)(ContainerItem);
