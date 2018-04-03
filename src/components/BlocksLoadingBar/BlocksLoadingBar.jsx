import React from 'react';
import PropTypes from 'prop-types';

import './BlocksLoadingBar.scss';

const BlocksLoadingBar = ({ currentBlock, width, blockNumber }) => (
  <div className="blocks-loading-bar">
    <div
      className={`_${Math.floor((currentBlock - blockNumber) / (width / 5))}`}
      style={{ width: `${(currentBlock - blockNumber) / (width / 100)}%` }}
    />
  </div>
);

BlocksLoadingBar.propTypes = {
  currentBlock: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  blockNumber: PropTypes.number.isRequired,
};

export default BlocksLoadingBar;
