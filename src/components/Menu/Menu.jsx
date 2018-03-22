import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeGameplayView } from '../../actions/gameplayActions';
import { GP_BUY_BOOSTER } from '../../actions/actionTypes';

import './Menu.scss';

import Projects from '../Projects/Projects';

const Menu = ({ gameplayView, changeGameplayView }) => (
  <div className="menu-wrapper">
    <div className="buy-booster-wrapper">
      <button
        disabled={gameplayView === GP_BUY_BOOSTER}
        onClick={() => { changeGameplayView(GP_BUY_BOOSTER); }}
      >
        Store
      </button>

      <div className="separator" />

      <Projects projects={[1, 2, 3]} />
    </div>
  </div>
);

Menu.propTypes = {
  gameplayView: PropTypes.string.isRequired,
  changeGameplayView: PropTypes.func.isRequired,
};

const mapStateToProps = ({ gameplay }) => ({
  gameplayView: gameplay.gameplayView,
});

const mapDispatchToProps = {
  changeGameplayView,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
