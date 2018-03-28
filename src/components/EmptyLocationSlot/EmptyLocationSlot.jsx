import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { checkIfCanPlayCard } from '../../services/gameMechanicsService';

import './EmptyLocationSlot.scss';

const EmptyLocationSlot = ({ card, globalStats }) => {
  let canDrop = false;

  if (card) canDrop = checkIfCanPlayCard(card.stats, globalStats, null, false);

  return (
    <div
      className={`
        empty-loc-slot-wrapper
        ${(card && canDrop) && 'can-drop'}
        ${(card && !canDrop) && 'no-drop'}
      `}
    >
      <div className="empty-loc-slot">
        {
          !card &&
          <div className="no-location-text">
            Drop Location here
          </div>
        }
        {
          card &&
          <div className="drop-content">
            You
            <span>{ canDrop ? 'Can' : 'Can\'t' }</span>
            Drop
          </div>
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
