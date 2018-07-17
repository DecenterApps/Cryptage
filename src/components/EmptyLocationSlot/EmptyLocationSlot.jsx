import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EmptyHexagon from '../Decorative/EmptyHexagon';

import './EmptyLocationSlot.scss';

const EmptyLocationSlot = ({ card, gameplay, slot }) => {
  let canDrop = false;

  if (card && slot) canDrop = slot.canDrop(gameplay, card).allowed;

  return (
    <div
      className={`
        empty-loc-slot-wrapper
        ${(card && canDrop) && 'can-drop'}
        ${(card && !canDrop) && 'no-drop'}
      `}
    >
      <div className="empty-loc-slot">
        <EmptyHexagon />
      </div>
    </div>
  );
};

EmptyLocationSlot.defaultProps = {
  card: null,
  slot: null,
};

EmptyLocationSlot.propTypes = {
  card: PropTypes.object,
  slot: PropTypes.object,
  gameplay: PropTypes.object.isRequired,
};

const mapStateToProps = ({ gameplay }) => ({
  gameplay,
});

export default connect(mapStateToProps)(EmptyLocationSlot);
