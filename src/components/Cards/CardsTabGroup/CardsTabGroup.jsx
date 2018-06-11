import React from 'react';
import PropTypes from 'prop-types';
import HandCard from '../HandCard/HandCard';
import DragWrapper from '../../DragWrapper/DragWrapper';
import { typeToPluralMapping } from '../../../constants/mappings';

const CardsTabGroup = ({ cards, title }) => (
  <div className="card-type-wrapper">
    <div className="card-type-title-wrapper">
      <h1 className="card-type-title">{ typeToPluralMapping(title) }</h1>
    </div>
    <div className="card-type-inner-wrapper">
      {
        cards.map(card => (
          <div key={card.id} className="card-container">
            <DragWrapper key={card.id} {...{ card }}>
              <HandCard inHand card={card} hoverCentered />
            </DragWrapper>
          </div>
        ))
      }
    </div>
  </div>
);

CardsTabGroup.propTypes = {
  cards: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default CardsTabGroup;
