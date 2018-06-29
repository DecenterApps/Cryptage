import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './GameplayHeader.scss';

function getlength(number) {
  return number.toString().length;
}

const getClassForFont = (maxDev, available) => {
  const sum = getlength(maxDev) + getlength(available) + 1;
  if (sum > 9) return 'smallest';
  if (sum > 7) return 'small';
  else if (sum > 5) return 'mid';
  return 'large';
}

const GameplayHeader = ({
  blockNumber, globalStats, nickname, fundsPerBlock, projects,
}) => {
  const expPercantage = (globalStats.earnedXp / globalStats.requiredXp);

  const maxDev = globalStats.development + projects.reduce((acc, { lastDroppedItem }) => {
    if (lastDroppedItem && lastDroppedItem.isActive) acc += lastDroppedItem.mainCard.stats.cost.development;
    return acc;
  }, 0);

  return (
    <div className="gameplay-header-wrapper">
      <div className="gameplay-header-content">

        {/* Left section */}
        <div className="section">
          <div className="stats-wrapper people">
            <div className={`count ${getClassForFont(maxDev, globalStats.development)}`}>
              <div>{ globalStats.development }</div>
              <div className="smaller">&nbsp;&nbsp;/&nbsp;&nbsp;{maxDev}</div>
            </div>
          </div>
        </div>

        {/* Central section */}
        <div className="central">
          <div className="level">Level { globalStats.level }</div>
          <div className="name">{ nickname || 'NICKNAME' }</div>
          <div className="xp-wrapper"> {globalStats.earnedXp} / {globalStats.requiredXp} XP </div>
          {/* <div  style={{ width: `${expPercantage}%` }}  /> */}
          <svg className="xp-loader-wrapper">
            <defs>
              <linearGradient id="exp-bar" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset={0.5 - (expPercantage * 0.5) - 0.05} stopColor="#1E9500" stopOpacity="0"/>
                <stop offset={0.5 - (expPercantage * 0.5)} stopColor="#21A500"/>
                <stop offset="0.5" stopColor="#28C800"/>
                <stop offset={0.5 + (expPercantage * 0.5)} stopColor="#21A600"/>
                <stop offset={0.5 + (expPercantage * 0.5) + 0.05} stopColor="#1E9500" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d="M53 0H0L5.5 8H47L58 18H172L182 8H227.5L232.5 0H177L172 4H58L53 0Z" fill="url(#exp-bar)"/>
          </svg>
        </div>

        {/* Right section */}
        <div className="section">
          <div className="stats-wrapper funds">
            <div>{ globalStats.funds }</div>
            <div className="smaller">
              { fundsPerBlock > 0 && '+' }
              { fundsPerBlock }
              <span className="smaller">&nbsp;&nbsp;FPB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

GameplayHeader.propTypes = {
  blockNumber: PropTypes.number.isRequired,
  globalStats: PropTypes.object.isRequired,
  nickname: PropTypes.string.isRequired,
  fundsPerBlock: PropTypes.number.isRequired,
  projects: PropTypes.array.isRequired,
};

const mapStateToProps = ({ gameplay }) => ({
  blockNumber: gameplay.blockNumber,
  globalStats: gameplay.globalStats,
  nickname: gameplay.nickname,
  fundsPerBlock: gameplay.fundsPerBlock,
  projects: gameplay.projects,
});

export default connect(mapStateToProps)(GameplayHeader);
