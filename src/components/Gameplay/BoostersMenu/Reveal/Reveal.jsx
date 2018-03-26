import React from 'react';

import bgBack from './assets/bg-back.png';

export default ({ revealedCards }) => {
  return (
    <div className="booster-store-body">
      <h1 className="booster-text-gradient reveal-text">BOOSTER</h1>
      <div className="revealed-cards">
        {
          revealedCards.map(item => (
            <div className="revealed-card">
              <img src={bgBack} alt="" />
            </div>
          ))
        }
      </div>
    </div>
  );
}