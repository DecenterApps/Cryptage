import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import PropTypes from 'prop-types';
import HTML5Backend from 'react-dnd-html5-backend';
import Menu from '../Menu/Menu';
import Cards from '../Cards/Cards';
import Locations from '../Locations/Locations';
import Gameplay from '../Gameplay/Gameplay';
import { checkAccount } from '../../actions/appActions';
import { loadGameplayState } from '../../actions/gameplayActions';

import './App.scss';

@DragDropContext(HTML5Backend)
class App extends Component {
  async componentWillMount() {
    await this.props.checkAccount();
    this.props.loadGameplayState();
  }

  render() {
    return (
      <div className="app-wrapper">
        <div className="app-top-section-wrapper">
          <Menu />
          <Gameplay />
          <Locations />
        </div>

        <Cards />
      </div>
    );
  }
}

App.propTypes = {
  checkAccount: PropTypes.func.isRequired,
  loadGameplayState: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  checkAccount, loadGameplayState,
};

export default connect(null, mapDispatchToProps)(App);
