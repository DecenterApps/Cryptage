import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ethCircle from './eth-circle.png';
import devCircle from './dev-circle.png';
import fundsCircle from './funds-circle.png';
import shape1 from './header-shape-1.png';

import './GameplayHeader.scss';

const GameplayHeader = ({
  blockNumber, globalStats, nickname, fundsPerBlock,
}) => (
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
            <div className="xp-wrapper">{ globalStats.earnedXp } / { globalStats.requiredXp } EXP</div>
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="section">
        <div className="stats-container">
          <div className="stats-wrapper dev-stats">
            <div className="dev-circle" />

            <div className="meta-wrapper">
              <div className="count">{ globalStats.development }</div>
              <div className="label">Development</div>
            </div>
          </div>

          <div className="stats-wrapper funds-stats">
            <div className="funds-circle" />

            <div className="meta-wrapper">
              <div className="count">
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

GameplayHeader.propTypes = {
  blockNumber: PropTypes.number.isRequired,
  globalStats: PropTypes.object.isRequired,
  nickname: PropTypes.string.isRequired,
  fundsPerBlock: PropTypes.number.isRequired,
};

const mapStateToProps = ({ gameplay, app }) => ({
  blockNumber: app.blockNumber,
  globalStats: gameplay.globalStats,
  nickname: gameplay.nickname,
  fundsPerBlock: gameplay.fundsPerBlock,
});

export default connect(mapStateToProps)(GameplayHeader);
