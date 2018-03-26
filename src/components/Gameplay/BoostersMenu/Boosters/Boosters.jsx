import React from 'react';

import bgEmpty from '../assets/bg-empty.png';
import ethCircle from '../../GameplayHeader/eth-circle.png';

import bgLeft from '../assets/bg-left.png';
import bgMiddle from '../assets/bg-middle.png';
import bgRight from '../assets/bg-right.png';

export default ({ boosters, isFetching, revealBooster, accountBalance, buyBoosterPack }) => {
  const images = [bgMiddle, bgLeft, bgRight];
  const classes = ['booster-middle', 'booster-left', 'booster-right'];
  return (
    <div className="booster-store-body">
      <div className="boosters-wrapper">
        {(boosters.length === 0 && !isFetching) &&
        <div className="boosters">
          <div className="booster booster-middle">
            <img src={bgEmpty} alt="" />
            <p className="booster-empty-text">You <br /> don&apos;t <br /> have any boosters</p>
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
                </div>
              ))
            }
            {/*{*/}
            {/*boosters.map(item => (*/}
            {/*<div className="flip-container" key={item.id}>*/}

            {/*<div className="flipper booster">*/}
            {/*<div className="front" style={{ backgroundImage: `url(${bg})` }}>*/}
            {/*<p className="booster-text-gradient">BOOSTER</p>*/}

            {/*{item.revealing &&*/}
            {/*<span>Revealing booster <Spinner color="white" size={2} /></span>}*/}
            {/*</div>*/}
            {/*<div className="back" style={{ backgroundImage: `url(${bgBack})` }}>*/}
            {/*<button*/}
            {/*disabled={item.revealing}*/}
            {/*onClick={() => this.props.revealBooster(item.id)}*/}
            {/*className="booster-reveal"*/}
            {/*>*/}
            {/*{!item.revealing && 'Reveal'}*/}
            {/*{item.revealing && 'revealing booster'}*/}
            {/*</button>*/}
            {/*</div>*/}
            {/*</div>*/}
            {/*</div>*/}
            {/*))*/}
            {/*}*/}
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
        /> ETH {parseFloat(accountBalance).toFixed(2)}
      </div>
    </div>
  );
}