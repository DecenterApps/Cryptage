import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { checkIfCanPlayCard } from '../../../services/gameMechanicsService';
import AvailableDropIcon from '../../Decorative/AvailableDropIcon';
import UnavailableDropIcon from '../../Decorative/UnavailableDropIcon';

import './EmptyCardSlot.scss';

const EmptyCardSlot = ({ card, gameplay, slot }) => {
  let canDrop = false;

  if (card && slot) canDrop = slot.canDrop(gameplay, card).allowed;

  return (
    <div
      className={`
        empty-slot-wrapper
        empty-asset-wrapper
        ${(card && canDrop) && 'can-drop'}
        ${(card && !canDrop) && 'no-drop'}
      `}
    >
      {/*<div className="inner-empty-slot">*/}
        {/*{*/}
          {/*card && goodCardType &&*/}
          {/*<div className="drop-content">{ canDrop ? <AvailableDropIcon /> : <UnavailableDropIcon /> }</div>*/}
        {/*}*/}
      {/*</div>*/}
      <svg>
        <defs>
          <linearGradient
            id="empty-slot-border-gradient"
            y1="0%"
            y2="100%"
            x1="0%"
            x2="0%"
          >
            <stop
              offset="0%"
              style={{ stopColor: '#6E6CBC' }}
            />
            <stop
              offset="100%"
              style={{ stopColor: 'rgba(110, 108, 168, .3)' }}
            />
          </linearGradient>
          <linearGradient
            id="empty-slot-fill-gradient"
            y1="70%"
            y2="30%"
            x1="0%"
            x2="100%"
          >
            <stop
              offset="0%"
              style={{ stopColor: 'rgba(47, 25, 104, .3)' }}
            />
            <stop
              offset="50%"
              style={{ stopColor: 'rgba(47, 25, 104, .4)' }}
            />
            <stop
              offset="100%"
              style={{ stopColor: 'rgba(21, 8, 54, .4)' }}
            />
          </linearGradient>
        </defs>
        <polygon
          className="empty-slot-border-gradient"
          points="8,0 100,0 100,134 92,142 0,142 0,8"
          stroke="url(#empty-slot-border-gradient)"
          fill="url(#empty-slot-fill-gradient)"
        />
      </svg>
    </div>
  );
};

EmptyCardSlot.defaultProps = {
  card: null,
  slot: null,
};

EmptyCardSlot.propTypes = {
  card: PropTypes.object,
  slot: PropTypes.object,
  gameplay: PropTypes.object.isRequired,
};

const mapStateToProps = ({ gameplay }) => ({
  gameplay
});

export default connect(mapStateToProps)(EmptyCardSlot);
