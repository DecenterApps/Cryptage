import React from 'react';
import PropTypes from 'prop-types';
import DropSlotWrapper from '../DropSlotWrapper/DropSlotWrapper';
import { guid } from '../../services/utils';

import './DropSlotsWrapper.scss';

const DropSlotsWrapper = props => (
  <div className="drop-slots-wrapper">
    {
      props.dropSlots.map((slot, index) => (
        <DropSlotWrapper
          key={guid()}
          slot={slot}
          accepts={slot.accepts}
          slotType={slot.slotType}
          lastDroppedItem={slot.lastDroppedItem}
          onDrop={item => props.onItemDrop(index, item)}
          index={index}
          {...props}
        >
          {React.cloneElement(props.element)}
        </DropSlotWrapper>
      ))
    }
  </div>
);

DropSlotsWrapper.propTypes = {
  dropSlots: PropTypes.array.isRequired,
  element: PropTypes.node.isRequired,
};

export default DropSlotsWrapper;

