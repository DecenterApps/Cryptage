import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LargeCard from '../../Cards/LargeCard/LargeCard';

import bgBack from './bg-back.png';
import './RevealCards.scss';

const RevealCards = ({ cards, newCardTypes }) => (
  <div className="reveal-cards-wrapper">
    {
      cards.map((card) => {
        const showNew = newCardTypes.includes(card.metadata.id);

        return (
          <div className="revealed-card" key={card.id}>
            <div
              className="flip-container"
              onClick={e => e.currentTarget.classList.toggle('hover')}
            >
              <div className="flipper">
                <div className="front">
                  <img src={bgBack} alt="" />
                </div>
                <div className="back">
                  { showNew && <LargeCard showNew removeNew={false} card={card} /> }
                  { !showNew && <LargeCard card={card} /> }
                </div>
              </div>
            </div>
          </div>
        );
      })
    }
  </div>
);

RevealCards.propTypes = {
  cards: PropTypes.array.isRequired,
  newCardTypes: PropTypes.array.isRequired,
};

const mapStateToProps = ({ gameplay }) => ({
  newCardTypes: gameplay.newCardTypes,
});

export default connect(mapStateToProps)(RevealCards);
