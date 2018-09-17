import React from 'react';
import PropTypes from 'prop-types';

import './HeaderBar.scss';

const HeaderBar = ({ title, color }) => (
  <div className="header-bar">
    <div className="header-bar-wrapper">
      <div className="bar-wrapper" />
      <div>
        <div
          className="bar-name"
          style={{ color: color || '#fff' }}
        >
          {title || ''}
        </div>
      </div>
      <div className="bar-wrapper reverse" />
    </div>

    <div className="background-drop" />
  </div>
);

HeaderBar.defaultProps = {
  color: '',
};

HeaderBar.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default HeaderBar;

