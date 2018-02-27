import React from 'react';
import PropTypes from 'prop-types';

import './Spiner.scss';

const styleLoader = (color, size) => ({
  fontSize: `${size ? `${size}px` : '10px'}`,
  margin: `${size ? `${size * 3}px` : '30px'}`,
  color: `${color || '#000'}`,
});

const Spinner = ({ color, size }) => (
  <div className="loader" style={styleLoader(color, size)} />
);

Spinner.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

Spinner.defaultProps = {
  color: '10px',
  size: 10,
};

export default Spinner;
