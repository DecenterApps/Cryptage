import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import PropTypes from 'prop-types';
import HTML5Backend from 'react-dnd-html5-backend';
import Menu from '../Menu/Menu';
import Cards from '../Cards/Cards';
import Locations from '../Locations/Locations';
import Gameplay from '../Gameplay/Gameplay';
import Projects from '../Projects/Projects';
import { checkAccount, loadingEnded, listenForNewBlocks, updateCurrentBlockNumber } from '../../actions/appActions';
import { loadGameplayState } from '../../actions/gameplayActions';

import './App.scss';

@DragDropContext(HTML5Backend)
class App extends Component {
  async componentWillMount() {
    await this.props.checkAccount();
    await this.props.loadGameplayState();
    this.props.listenForNewBlocks();
    this.props.updateCurrentBlockNumber();
    this.props.loadingEnded();
  }

  render() {
    if (this.props.loadingApp) return (<div>Loading app</div>);

    return (
      <div className="app-wrapper">
        <div className="app-top-section-wrapper">
          <Locations />
          <Gameplay />
          {/*<Menu />*/}
          <Projects />
        </div>

        {/*<Cards />*/}
      </div>
    );
  }
}

App.propTypes = {
  checkAccount: PropTypes.func.isRequired,
  loadGameplayState: PropTypes.func.isRequired,
  loadingEnded: PropTypes.func.isRequired,
  loadingApp: PropTypes.bool.isRequired,
  listenForNewBlocks: PropTypes.func.isRequired,
  updateCurrentBlockNumber: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  checkAccount, loadGameplayState, loadingEnded, listenForNewBlocks, updateCurrentBlockNumber,
};

const mapStateToProps = ({ app }) => ({
  loadingApp: app.loadingApp,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
