import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ethCircle from './eth-circle.png';
import devCircle from './dev-circle.png';
import fundsCircle from './funds-circle.png';
import shape1 from './header-shape-1.png';

import './GameplayHeader.scss';

function getlength(number) {
  return number.toString().length;
}

const getClassForFont = (maxDev,available) => {
  let sum = getlength(maxDev) + getlength(available) + 1;
  if (sum > 7) return 'small';
  else if (sum > 5) return 'mid';
  else return 'large';
}

const GameplayHeader = ({
  blockNumber, globalStats, nickname, fundsPerBlock, projects,
}) => {
  const expPercantage = (globalStats.earnedXp * 100 / globalStats.requiredXp);

  const maxDev = globalStats.development + projects.reduce((acc, { lastDroppedItem }) => {
    if (lastDroppedItem && lastDroppedItem.isActive) acc += lastDroppedItem.cards[0].stats.cost.development;
    return acc;
  }, 0);

  return (
    <div className="gameplay-header-wrapper">
      <div className="gameplay-header-content">

        {/* Left section */}
        <div className="section">
          <div className="stats-wrapper">
            <img src={ethCircle} alt="Ethereum logo circle" />

            <div className="meta-wrapper">
              <div className="count">{ blockNumber }</div>
              <div className="label">Eth Blocks</div>
            </div>
          </div>

          <div className="bar" />
        </div>

        {/* Central section */}
        <div className="central">
          <div className="central-small">
            <img src={shape1} alt="Header shape small" />

            <div className="level">Level { globalStats.level }</div>
          </div>

          <div className="central-big">
            <img src={shape1} alt="Header shape big" />

            <div className="big-stats">
              <div className="name">
                { nickname || 'NICKNAME' }
              </div>
              <div className="xp-wrapper"> {globalStats.earnedXp} / {globalStats.requiredXp} EXP </div>
              {/* <div  style={{ width: `${expPercantage}%` }}  /> */}
              <svg className="xp-loader-wrapper">
                  <defs>
                    <clipPath id="xp-progress-clip">
                      <polygon points="0,0 155,0 147,14 8,14" />
                    </clipPath>
                    <linearGradient id="xp-progress-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{stopColor:'rgb(51, 255, 0)', stopOpacity:0.8}} />
                      <stop offset="100%" style={{stopColor:'rgb(51, 255, 0)', stopOpacity:0.4}} />
                    </linearGradient>
                    <linearGradient id="xp-progress-bg" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{stopColor:'rgb(54, 38, 95)', stopOpacity:0.8}} />
                      <stop offset="100%" style={{stopColor:'rgb(54, 38, 95)', stopOpacity:0.4}} />/>
                    </linearGradient>
                  </defs>
                  <polygon
                    fill="url(#xp-progress-bg)"
                    points="0,0 155,0 147,14 8,14"
                  />
                  <polygon
                    className="card-image-inner"
                    fill="url(#xp-progress-grad)"
                    points={`0,0 ${1.55*expPercantage},0 ${1.55*expPercantage - 8},14 0,14`}
                    clipPath="url(#xp-progress-clip)"
                  />
              </svg>

            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="section">
          <div className="stats-container">
            <div className="stats-wrapper dev-stats">
              <div className="dev-circle" />

              <div className="meta-wrapper">
                <div className={`count ${getClassForFont(maxDev,globalStats.development)}`}>{ globalStats.development } / {maxDev} </div>
                <div className="label">Development</div>
              </div>
            </div>

            <div className="stats-wrapper funds-stats">
              <div className="funds-circle" />

              <div className="meta-wrapper">
                <div className={`count ${getClassForFont(maxDev,globalStats.development)}`}>
                  <div>{ globalStats.funds }</div>
                  <div className="label">Funds</div>
                </div>

                <div className="fpb">
                  { fundsPerBlock }
                  <span>FPB</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bar" />
        </div>
      </div>
    </div>
  );
}

GameplayHeader.propTypes = {
  blockNumber: PropTypes.number.isRequired,
  globalStats: PropTypes.object.isRequired,
  nickname: PropTypes.string.isRequired,
  fundsPerBlock: PropTypes.number.isRequired,
  projects: PropTypes.array.isRequired,
};

const mapStateToProps = ({ gameplay, app }) => ({
  blockNumber: app.blockNumber,
  globalStats: gameplay.globalStats,
  nickname: gameplay.nickname,
  fundsPerBlock: gameplay.fundsPerBlock,
  projects: gameplay.projects,
});

export default connect(mapStateToProps)(GameplayHeader);
