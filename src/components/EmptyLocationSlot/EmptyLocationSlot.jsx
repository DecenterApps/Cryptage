import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { checkIfCanPlayCard } from '../../services/gameMechanicsService';
import AvailableDropIcon from '../Decorative/AvailableDropIcon';
import UnavailableDropIcon from '../Decorative/UnavailableDropIcon';

import './EmptyLocationSlot.scss';

const EmptyLocationSlot = ({ card, globalStats }) => {
  let canDrop = false;
  let goodCardType = false;

  if (card) {
    goodCardType = card.stats.type === 'Location';
    if (goodCardType) canDrop = checkIfCanPlayCard(card.stats, globalStats, null);
  }

  return (
    <div
      className={`
        empty-loc-slot-wrapper
        ${(card && goodCardType && canDrop) && 'can-drop'}
        ${(card && goodCardType && !canDrop) && 'no-drop'}
      `}
    >
      <div className="empty-loc-slot">
        {
          card && goodCardType &&
          <div className="drop-content">{ canDrop ? <AvailableDropIcon /> : <UnavailableDropIcon /> }</div>
        }
      </div>
    </div>
  );
};

EmptyLocationSlot.defaultProps = {
  card: null,
};

EmptyLocationSlot.propTypes = {
  card: PropTypes.object,
  globalStats: PropTypes.object.isRequired,
};

const mapStateToProps = ({ gameplay }) => ({
  globalStats: gameplay.globalStats,
});

export default connect(mapStateToProps)(EmptyLocationSlot);
