import React from 'react';
import PropTypes from 'prop-types';
import DropSlotWrapper from '../DropSlotWrapper/DropSlotWrapper';
import { guid } from '../../services/utils';

import './DropSlotsWrapper.scss';

const DropSlotsWrapper = props => (
  <div className="drop-slots-wrapper">
    {
      props.dropSlots.map(({ accepts, lastDroppedItem }, index) => (
        <DropSlotWrapper
          key={guid()}
          accepts={accepts}
          lastDroppedItem={lastDroppedItem}
          onDrop={item => props.onItemDrop(index, item)}
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

