import React from 'react';
import PropTypes from 'prop-types';
import LargeCard from '../../Cards/LargeCard/LargeCard';

import bgBack from './bg-back.png';
import './RevealCards.scss';

const RevealCards = ({ cards }) => (
  <div className="reveal-cards-wrapper">
    {
      cards.map(card => (
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
                <LargeCard card={card} />
              </div>
            </div>
          </div>
        </div>
      ))
    }
  </div>
);

RevealCards.propTypes = {
  cards: PropTypes.array.isRequired,
};

export default RevealCards;
