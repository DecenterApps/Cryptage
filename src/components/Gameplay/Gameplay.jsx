import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BoostersMenu from './BoostersMenu/BoostersMenu';
import { GP_BUY_BOOSTER } from '../../actions/actionTypes';

import './Gameplay.scss';

const Gameplay = ({ gameplayView }) => (
  <div className="gameplay-wrapper">
    { gameplayView === GP_BUY_BOOSTER && <BoostersMenu /> }
  </div>
);

Gameplay.propTypes = {
  gameplayView: PropTypes.string.isRequired,
};

const mapStateToProps = ({ app }) => ({
  gameplayView: app.gameplayView,
});

export default connect(mapStateToProps, null)(Gameplay);
