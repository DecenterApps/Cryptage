import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formattedNumber } from '../../../services/utils';

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
};

const GameplayHeader = ({
  globalStats, nickname, fundsPerBlock, projects, blockNumber,
}) => {
  const requiredXp = globalStats.requiredXp || Infinity;

  const expPercantage = (globalStats.earnedXp / requiredXp);

  const maxDev = globalStats.development + projects.reduce((_acc, { card }) => {
    let acc = _acc;
    if (card && card.running) {
      acc += card.cost.development;
    }
    return acc;
  }, 0);

  const formatedFunds = formattedNumber(globalStats.funds);
  const formatedFpb = formattedNumber(fundsPerBlock);

  const formattedEarnedXp = globalStats.earnedXp.toString().replace(/\d(?=(\d{3})+$)/g, '$&,');
  const formattedRequiredXp = requiredXp.toString().replace(/\d(?=(\d{3})+$)/g, '$&,');

  return (
    <div className="gameplay-header-wrapper">
      <div className="gameplay-header-content">

        {/* Left section */}
        <div className="section">
          <div className="stats-wrapper people">
            <div className={`count ${getClassForFont(maxDev, globalStats.development)}`}>
              { globalStats.development }
              <span className="smaller">&nbsp;&nbsp;/&nbsp;&nbsp;{maxDev}</span>
            </div>
          </div>
        </div>

        {/* Central section */}
        <div className="central">
          <div className="block-number">
            <span>
              Current Block:
            </span>
            {blockNumber.toString().replace(/\d(?=(\d{3})+$)/g, '$&,')}
          </div>
          <div className="level">Level { globalStats.level }</div>
          <div className="name">{ nickname || 'NICKNAME' }</div>
          <div className="xp-wrapper">
            {formattedEarnedXp} / {formattedRequiredXp} XP
          </div>
          {/* <div  style={{ width: `${expPercantage}%` }}  /> */}
          <svg className="xp-loader-wrapper">
            <defs>
              <linearGradient id="exp-bar" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset={0.5 - (expPercantage * 0.5) - 0.05} stopColor="#1E9500" stopOpacity="0" />
                <stop offset={0.5 - (expPercantage * 0.5)} stopColor="#21A500" />
                <stop offset="0.5" stopColor="#28C800" />
                <stop offset={0.5 + (expPercantage * 0.5)} stopColor="#21A600" />
                <stop offset={0.5 + (expPercantage * 0.5) + 0.05} stopColor="#1E9500" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M53 0H0L5.5 8H47L58 18H172L182 8H227.5L232.5 0H177L172 4H58L53 0Z" fill="url(#exp-bar)" />
          </svg>
        </div>

        {/* Right section */}
        <div className="section">
          <div className="stats-wrapper funds">
            <div title={globalStats.funds}>
              { formatedFunds }
            </div>
            <div className="smaller">
              { formatedFpb }
              <span className="smaller">&nbsp;&nbsp;Funds Per Block</span>
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
  globalStats: gameplay.stats,
  nickname: gameplay.nickname,
  fundsPerBlock: gameplay.stats.fundsPerBlock,
  projects: [...gameplay.projectSlots],
});

export default connect(mapStateToProps)(GameplayHeader);
