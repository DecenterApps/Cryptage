import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './EmptyProjectSlot.scss';
import EmptyProjectItemVector from './EmptyProjectItemVector';

const EmptyProjectSlot = ({ card, gameplay, slot }) => {
  let canDrop = false;

  if (card && slot) canDrop = slot.canDrop(gameplay, card).allowed;

  return (
    <div
      className={`
        empty-project-slot-wrapper
        ${(card && canDrop) && 'can-drop'}
        ${(card && !canDrop) && 'no-drop'}
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
  slot: null,
};

EmptyProjectSlot.propTypes = {
  card: PropTypes.object,
  slot: PropTypes.object,
  gameplay: PropTypes.object.isRequired,
};

const mapStateToProps = ({ gameplay }) => ({
  gameplay,
});

export default connect(mapStateToProps)(EmptyProjectSlot);
