import React from 'react';
import PropTypes from 'prop-types';
import LargeCard from '../../Cards/LargeCard/LargeCard';
import RarityBorder from '../../Cards/RarityBorder/RarityBorder';

import bgBack from './bg-back.png';
import './RevealCards.scss';

const RevealCards = ({ cards }) => (
  <div className="reveal-cards-wrapper">
    {
      cards.map((card) => {
        const showNew = card.isNew;

        return (
          <div className="revealed-card" key={card.id}>
            <div
              className="flip-container"
              onClick={e => e.currentTarget.classList.toggle('hover')}
            >
              <div className="flipper">
                <div className="front">
                  <RarityBorder card={card} />
                  <img draggable={false} src={bgBack} alt="" />
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
};

export default RevealCards;
