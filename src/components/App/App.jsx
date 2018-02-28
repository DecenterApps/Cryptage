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

import './App.scss';

@DragDropContext(HTML5Backend)
class App extends Component {
  componentDidMount() {
    this.props.checkAccount();
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
};

const mapDispatchToProps = {
  checkAccount,
};

export default connect(null, mapDispatchToProps)(App);
