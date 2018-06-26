import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { checkIfCanPlayCard } from '../../services/gameMechanicsService';
import AvailableDropIcon from '../Decorative/AvailableDropIcon';
import UnavailableDropIcon from '../Decorative/UnavailableDropIcon';

import './EmptyProjectSlot.scss';
import EmptyProjectItemVector from './EmptyProjectItemVector';

const EmptyProjectSlot = ({ card, globalStats }) => {
  let canDrop = false;
  let goodCardType = false;

  if (card) {
    goodCardType = card.stats.type === 'Project';
    if (goodCardType) canDrop = checkIfCanPlayCard(card.stats, globalStats, null);
  }

  return (
    <div
      className={`
        empty-project-slot-wrapper
        ${(card && goodCardType && canDrop) && 'can-drop'}
        ${(card && goodCardType && !canDrop) && 'no-drop'}
      `}
    >
      <div className="empty-project-slot">
        <EmptyProjectItemVector />
      </div>
    </div>
  );
};

EmptyProjectSlot.defaultProps = {
  card: null,
};

EmptyProjectSlot.propTypes = {
  card: PropTypes.object,
  globalStats: PropTypes.object.isRequired,
};

const mapStateToProps = ({ gameplay }) => ({
  globalStats: gameplay.stats,
});

export default connect(mapStateToProps)(EmptyProjectSlot);
