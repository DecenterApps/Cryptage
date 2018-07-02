import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DropSlotWrapper from '../DropSlotWrapper/DropSlotWrapper';
import { guid } from '../../services/utils';
import { dropCard } from '../../actions/dropActions';

import './DropSlotsWrapper.scss';

const DropSlotsWrapper = props => (
  <div className="drop-slots-wrapper">
    {
      props.dropSlots.map((slot, index) => {
        console.log('DropSlotsWrapper', slot.card);
        return (
          <DropSlotWrapper
            key={guid()}
            slot={slot}
            accepts={slot.acceptedTags}
            // slotType={slot.slotType}
            lastDroppedItem={slot.card}
            onDrop={(item) => { props.dropCard(slot, item); }}
            index={index}
            {...props}
          >
            {React.cloneElement(props.element)}
          </DropSlotWrapper>
        )
      })
    }
  </div>
);

DropSlotsWrapper.propTypes = {
  dropSlots: PropTypes.array.isRequired,
  element: PropTypes.node.isRequired,
};

const mapDispatchToProps = { dropCard };

export default connect(null, mapDispatchToProps)(DropSlotsWrapper);

