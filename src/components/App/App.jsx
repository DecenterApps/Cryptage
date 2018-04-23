import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import PropTypes from 'prop-types';
import HTML5Backend from 'react-dnd-html5-backend';
import Locations from '../Locations/Locations';
import Gameplay from '../Gameplay/Gameplay';
import Projects from '../Projects/Projects';
import NoMetaMask from './NoMetaMask/NoMetaMask';
import ModalRoot from '../Modals/ModalRoot';
import ReportABug from './ReportABug/ReportABug';
import CustomDragLayer from '../CustomDragLayer/CustomDragLayer';
import { loadGameplayState, updateFundsBlockDifference } from '../../actions/gameplayActions';
import {
  checkAccount,
  loadingEnded,
  listenForNewBlocks,
  updateCurrentBlockNumber,
} from '../../actions/appActions';

import './App.scss';

@DragDropContext(HTML5Backend)
class App extends Component {
  async componentWillMount() {
    await this.props.checkAccount();
    await this.props.loadGameplayState();
    await this.props.updateFundsBlockDifference();
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

          {accountError && <NoMetaMask accountError={accountError} />}

          {
            !accountError && [
              <Locations key="A" />,
              <Gameplay key="B" />,
              <Projects key="C" />,
            ]
          }
        </div>

        <ModalRoot />
        <ReportABug />
        <CustomDragLayer />
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
  updateFundsBlockDifference: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  checkAccount,
  loadGameplayState,
  loadingEnded,
  listenForNewBlocks,
  updateCurrentBlockNumber,
  updateFundsBlockDifference,
};

const mapStateToProps = ({ app }) => ({
  loadingApp: app.loadingApp,
  accountError: app.accountError,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
