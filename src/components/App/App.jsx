import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Menu from '../Menu/Menu';
import Cards from '../Cards/Cards';
import Locations from '../Locations/Locations';
import Gameplay from '../Gameplay/Gameplay';

import './App.scss';

@DragDropContext(HTML5Backend)
class App extends Component {
  componentDidMount() {
    console.log('Start App');
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

App.propTypes = {};

export default connect(null, null)(App);
