import React from 'react';
import PropTypes from 'prop-types';
import HandCard from '../HandCard/HandCard';
import DragWrapper from '../../DragWrapper/DragWrapper';
import { typeToPluralMapping } from '../../../constants/mappings';

const CardsTabGroup = ({ type }) => (
  <div className="card-type-wrapper">
    <div className="card-type-title-wrapper">
      <h1 className="card-type-title">{ typeToPluralMapping(type[0].stats.type) }</h1>
    </div>
    {
      type.map(card => (
        <div key={card.id} className="card-container">
          <DragWrapper key={card.id} {...{ card }}>
            <HandCard inHand card={card} hoverCentered />
          </DragWrapper>
        </div>
      ))
    }
  </div>
);

CardsTabGroup.propTypes = {
  type: PropTypes.array.isRequired,
};

export default CardsTabGroup;
