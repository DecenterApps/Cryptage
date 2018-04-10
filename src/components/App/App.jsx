import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import PropTypes from 'prop-types';
import HTML5Backend from 'react-dnd-html5-backend';
import Locations from '../Locations/Locations';
import Gameplay from '../Gameplay/Gameplay';
import Projects from '../Projects/Projects';
import NoMetaMask from './NoMetaMask/NoMetaMask';
import { loadGameplayState } from '../../actions/gameplayActions';
import {
  checkAccount,
  loadingEnded,
  listenForNewBlocks,
  updateCurrentBlockNumber,
} from '../../actions/appActions';

import './App.scss';
import bug from './bug.png';

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
    const { loadingApp, accountError } = this.props;

    if (loadingApp) return (<div />);

    return (
      <div className={`app-wrapper ${accountError ? 'no-acc' : 'has-acc'}`}>

        <div className="app-top-section-wrapper">
          <div className="logo-wrapper" />

          { accountError && <NoMetaMask accountError={accountError} /> }

          {
            !accountError && [
              <Locations key="A" />,
              <Gameplay key="B" />,
              <Projects key="C" />,
            ]
          }
        </div>
        <a
          className="bug-report"
          href="https://insights.hotjar.com/s?siteId=836110&surveyId=45077"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={bug} alt="Report a bug" />
          <p>Report a bug</p>
        </a>
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
  accountError: PropTypes.string.isRequired,
};

const mapDispatchToProps = {
  checkAccount, loadGameplayState, loadingEnded, listenForNewBlocks, updateCurrentBlockNumber,
};

const mapStateToProps = ({ app }) => ({
  loadingApp: app.loadingApp,
  accountError: app.accountError,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
