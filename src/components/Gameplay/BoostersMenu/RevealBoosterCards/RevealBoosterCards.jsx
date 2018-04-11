import React from 'react';
import RevealCards from '../../RevealCards/RevealCards';

const RevealBoosterCards = ({ revealedCards, exitBoosterView }) => (
  <div className="booster-store-body">
    <h1 className="booster-text-gradient reveal-text">CARD PACK</h1>
    <RevealCards cards={revealedCards} />

    <div
      onClick={exitBoosterView}
      className="orange-button reveal-done-button"
    >
      DONE
    </div>
  </div>
);

export default RevealBoosterCards;
