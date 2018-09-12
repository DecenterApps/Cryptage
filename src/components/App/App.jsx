import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import HTML5Backend from 'react-dnd-html5-backend';
import Locations from '../Locations/Locations';
import Gameplay from '../Gameplay/Gameplay';
import Projects from '../Projects/Projects';
import NoMetaMask from './NoMetaMask/NoMetaMask';
import ReportABug from './ReportABug/ReportABug';
import CustomDragLayer from '../CustomDragLayer/CustomDragLayer';
import { loadGameplayState } from '../../actions/gameplayActions';
import { checkAccount } from '../../actions/stateActions';
import {
  loadingEnded,
  listenForNewBlocks,
  updateCurrentBlockNumber,
} from '../../actions/appActions';

import './App.scss';
import Tutorial from '../Tutorial/Tutorial';
import Feedback from './Feedback/Feedback';
import CircleSpinner from '../Decorative/CircleSpinner/CircleSpinner';

@DragDropContext(HTML5Backend)
class App extends Component {
  async componentWillMount() {
    await this.props.checkAccount();
    if (!this.props.nickname) return this.props.loadingEnded();
    this.props.listenForNewBlocks();
    this.props.updateCurrentBlockNumber();
    this.props.loadingEnded();
  }

  render() {
    const { loadingApp, accountError, tutorialOpen, nickname, blockNumber } = this.props;

    if (loadingApp && (blockNumber === 0)) {
      return (
        <div className="loading-wrapper">
          <CircleSpinner />
          <p className="show-delayed">
            If this is taking too long, check your MetaMask connection
          </p>
        </div>
      );
    }

    if (!nickname && !accountError) {
      return (<Redirect to="/newuser" />);
    }

    return (
      <div className={`app-wrapper ${accountError ? 'no-acc' : 'has-acc'}`}>

        <div className="app-top-section-wrapper">

          {accountError && <NoMetaMask accountError={accountError} />}

          {
            !accountError && [
              <Locations key="A" />,
              <Gameplay key="B" />,
              <Projects key="C" />,
            ]
          }
        </div>

        <Feedback />
        <ReportABug />
        <CustomDragLayer />

        {
          tutorialOpen && <Tutorial />
        }
      </div>
    );
  }
}

App.propTypes = {
  checkAccount: PropTypes.func.isRequired,
  loadingEnded: PropTypes.func.isRequired,
  loadingApp: PropTypes.bool.isRequired,
  listenForNewBlocks: PropTypes.func.isRequired,
  updateCurrentBlockNumber: PropTypes.func.isRequired,
  accountError: PropTypes.string.isRequired,
  tutorialOpen: PropTypes.bool.isRequired,
  nickname: PropTypes.string.isRequired,
  blockNumber: PropTypes.number.isRequired,
};

const mapDispatchToProps = {
  checkAccount,
  loadingEnded,
  listenForNewBlocks,
  updateCurrentBlockNumber,
};

const mapStateToProps = ({ app, gameplay }) => ({
  loadingApp: app.loadingApp,
  accountError: app.accountError,
  tutorialOpen: app.tutorialOpen,
  nickname: gameplay.nickname,
  blockNumber: gameplay.blockNumber,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
