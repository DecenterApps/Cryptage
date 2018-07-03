import React from 'react';
import PropTypes from 'prop-types';
import HandCard from '../HandCard/HandCard';
import DragWrapper from '../../DragWrapper/DragWrapper';
import { typeToPluralMapping } from '../../../constants/mappings';
import { typeGradients } from '../../../actions/actionTypes';

const CardsTabGroup = ({ cards, title, open, toggleTab }) => {
  const orbColor = typeGradients[title.toLowerCase()];
  const openClass = open ? 'open' : 'closed';

  return (
    <div className="card-type-wrapper">
      <div className="card-type-title-wrapper">
        <h1 className="card-type-title">
          <span onClick={toggleTab}>
            { typeToPluralMapping(title) }
          </span>

          <div className="orb" style={{ backgroundColor: orbColor ? orbColor[0] : '#FF9D14' }} />
        </h1>
      </div>

      <div className={`card-type-inner-wrapper ${openClass}`}>
        {
          cards.length > 0 && cards.map(card => (
            <div key={card.id} className="card-container">
              <DragWrapper key={card.id} card={card}>
                <HandCard inHand card={card} hoverCentered />
              </DragWrapper>
            </div>
          ))
        }
        {
          cards.length === 0 &&
          <div>
            No cards in the tab
          </div>
        }
      </div>
    </div>
  );
};

CardsTabGroup.defaultProps = {
  open: false,
};

CardsTabGroup.propTypes = {
  cards: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  open: PropTypes.bool,
  toggleTab: PropTypes.func.isRequired,
};

export default CardsTabGroup;
