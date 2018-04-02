import React from 'react';
import CircleSpinner from '../../../Decorative/CircleSpinner/CircleSpinner';

import bgEmpty from '../assets/bg-empty.png';
import ethCircle from '../../GameplayHeader/eth-circle.png';

import bgLeft from '../assets/bg-left.png';
import bgMiddle from '../assets/bg-middle.png';
import bgRight from '../assets/bg-right.png';

export default ({
  boosters,
  isFetching,
  revealBooster,
  accountBalance,
  buyBoosterPack,
  currentBlock,
}) => {
  const images = [bgMiddle, bgLeft, bgRight];
  const classes = ['booster-middle', 'booster-left', 'booster-right'];
  return (
    <div className="booster-store-body">
      <div className="boosters-wrapper">
        {(boosters.length === 0) &&
          <div className="boosters">
            <div className="booster booster-middle">
              {
                isFetching &&
                <span className="circle-loader-wrapper">
                  <CircleSpinner />
                  <div>Loading</div>
                </span>
              }
              <img src={bgEmpty} alt="" />
              {
                !isFetching &&
                <p className="booster-empty-text">You <br /> don&apos;t <br /> have any boosters</p>
              }
            </div>
          </div>
        }

        {
          boosters.length > 0 &&
          <div className="boosters">
            {
              boosters.slice(0, 3).map((item, i) => (
                <div className={`booster ${classes[i]}`} key={item.id}>
                  <img src={images[i]} alt="" />
                  <p className="booster-placeholder booster-text-gradient">Booster</p>
                  <button
                    onClick={() => revealBooster(item.id)}
                    className="open-booster-placeholder booster-text-gradient"
                  >
                    Open
                  </button>
                  <div className="remaining">
                    <div
                      className={`_${Math.floor((currentBlock - item.blockNumber) / 51)}`}
                      style={{ width: `${(currentBlock - item.blockNumber) / 2.55}%` }}
                    />
                  </div>
                </div>
              ))
            }
          </div>
        }
      </div>
      <button className="orange-button booster-button" onClick={buyBoosterPack}>BUY
        BOOSTER
      </button>

      <div className="shop-funds">
        <img
          src={ethCircle}
          alt="Ethereum logo circle"
        /> ETH 0.01
      </div>
    </div>
  );
};
