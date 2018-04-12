import React from 'react';
import CircleSpinner from '../../../Decorative/CircleSpinner/CircleSpinner';

import bgEmpty from '../assets/bg-empty.png';
import ethCircle from '../../GameplayHeader/eth-circle.png';

import bgLeft from '../assets/bg-left.png';
import bgMiddle from '../assets/bg-middle.png';
import bgRight from '../assets/bg-right.png';
import BlocksLoadingBar from '../../../BlocksLoadingBar/BlocksLoadingBar';

export default ({
  boosters,
  isFetching,
  isBuying,
  isRevealing,
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
              <p className="booster-empty-text">You <br /> don&apos;t <br /> have any card packs.</p>
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
                  {
                    i === 0 && (isRevealing) &&
                    <span className="circle-loader-wrapper">
                      <CircleSpinner />
                      <div>Revealing</div>
                      <div>card</div>
                      <div>pack</div>
                    </span>
                  }
                  {
                    boosters.length > 3 &&
                    <div className="num-of-boosters">
                      +{boosters.length - 3}
                    </div>
                  }
                  <img src={images[i]} alt="" />
                  <p className="booster-placeholder booster-text-gradient">Card pack</p>

                  {
                    !isRevealing &&
                    <button
                      onClick={() => revealBooster(item.id)}
                      className="open-booster-placeholder booster-text-gradient"
                    >
                      Open
                    </button>
                  }

                  <BlocksLoadingBar
                    currentBlock={currentBlock}
                    width={255}
                    blockNumber={parseInt(item.blockNumber, 10)}
                  />
                </div>
              ))
            }
          </div>
        }
      </div>
      <button
        disabled={isBuying}
        className={`orange-button booster-button ${isBuying && 'button-buying'}`}
        onClick={buyBoosterPack}
      >
        {
          isBuying ? <span><CircleSpinner />Buying card pack...</span> : 'BUY CARD PACK'
        }
      </button>

      <div className="shop-funds">
        <img
          src={ethCircle}
          alt="Ethereum logo circle"
        /> ETH 0.001
      </div>
    </div>
  );
};
