import React from 'react';

import './HeaderBar.scss';

export default ({ title, color }) => (
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
      <div className="bar-wrapper" />
    </div>

    <div className="background-drop" />
  </div>
);

