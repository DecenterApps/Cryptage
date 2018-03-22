import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ethCircle from './eth-circle.png';
import devCircle from './dev-circle.png';
import fundsCircle from './funds-circle.png';
import shape1 from './header-shape-1.png';

import './GameplayHeader.scss';

const GameplayHeader = ({ blockNumber, globalStats }) => (
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
            <div className="name">Nickname</div>
            <div className="xp-wrapper">{ globalStats.experience } exp</div>
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="section">
        <div className="stats-container">
          <div className="stats-wrapper dev-stats">
            <img src={devCircle} alt="Development icon circle" />

            <div className="meta-wrapper">
              <div className="count">{ globalStats.development }</div>
              <div className="label">Development</div>
            </div>
          </div>

          <div className="stats-wrapper">
            <img src={fundsCircle} alt="Funds icon circle" />

            <div className="meta-wrapper">
              <div className="count">{ globalStats.funds }</div>
              <div className="label">Funds</div>
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
};

const mapStateToProps = ({ gameplay, app }) => ({
  blockNumber: app.blockNumber,
  globalStats: gameplay.globalStats,
});

export default connect(mapStateToProps)(GameplayHeader);
