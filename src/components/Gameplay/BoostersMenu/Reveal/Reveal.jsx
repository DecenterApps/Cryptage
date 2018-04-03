import React from 'react';

import bgBack from './assets/bg-back.png';
import LargeCard from '../../../Cards/LargeCard/LargeCard';

export default ({ revealedCards, exitBoosterView }) => {
  return (
    <div className="booster-store-body">
      <h1 className="booster-text-gradient reveal-text">CARD PACK</h1>
      <div className="revealed-cards">
        {
          revealedCards.map(card => (
            <div className="revealed-card" key={card.id}>
              <div
                className="flip-container"
                onClick={(e) => e.currentTarget.classList.toggle('hover')}
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
      <div
        onClick={exitBoosterView}
        className="orange-button reveal-done-button"
      >
        DONE
      </div>
    </div>
  );
}