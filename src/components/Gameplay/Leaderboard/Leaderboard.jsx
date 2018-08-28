import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeaderBar from '../../HeaderBar/HeaderBar';
import CloseIcon from '../../CloseIcon/CloseIcon';
import { exitNotLocationsView } from '../../../actions/gameplayActions';
import { getLeaderboardData } from '../../../actions/leaderboardActions';
import { guid } from '../../../services/utils';
import CircleSpinner from '../../Decorative/CircleSpinner/CircleSpinner';

import './Leaderboard.scss';
import SmallButton from '../../SmallButton/SmallButton';

class Leaderboard extends Component {
  componentWillMount() {
    this.props.getLeaderboardData();
  }

  render() {
    const {
      exitNotLocationsView, fetching, fetchingError, fetchingSuccess, leaderboardData, account,
    } = this.props;

    return (
      <div className="leaderboard-wrapper">
        <HeaderBar title="Leaderboard" />

        <div className="data-wrapper">
          {
            fetching &&
            <div className="fetching">
              <CircleSpinner />
            </div>
          }

          {
            !fetching &&
            fetchingError &&
            <div className="fetching-error">{ fetchingError }</div>
          }

          {
            !fetching &&
            fetchingSuccess && [
              <div key="leaderboard-table-header" className="data-header">
                <span className="nickname">Player</span>
                <span className="level">Level</span>
                <span className="exp">Experience</span>
              </div>,
              <div key="leaderboard-table-body" className="data-table">
                {
                  leaderboardData.map(({
                    nickname, level, xp, address,
                  }, index) => (
                    <div
                      className={`player-rank ${address === account ? 'curr-player' : 'not-player'}`}
                      key={guid()}
                    >
                      <div className="nickname">
                        <span className="rank">{index + 1}.</span>
                        <span className="text">
                          { nickname || address }
                        </span>
                      </div>

                      <div className="level">{level}</div>
                      <div className="xp">{xp.toString().replace(/\d(?=(\d{3})+$)/g, '$&,')}</div>
                    </div>
                  ))
                }
              </div>,
            ]
          }
        </div>

        <div className="button-wrapper">
          <div className="modal-buttons-bar" />

          <span onClick={exitNotLocationsView}>
            <SmallButton text="Back" />
          </span>
        </div>
      </div>
    );
  }
}

Leaderboard.defaultProps = {
  leaderboardData: null,
};

Leaderboard.propTypes = {
  fetching: PropTypes.bool.isRequired,
  fetchingError: PropTypes.string.isRequired,
  fetchingSuccess: PropTypes.bool.isRequired,
  exitNotLocationsView: PropTypes.func.isRequired,
  getLeaderboardData: PropTypes.func.isRequired,
  account: PropTypes.string.isRequired,
  leaderboardData: PropTypes.array,
};

const mapDispathToProps = ({ app, leaderboard }) => ({
  account: app.account,
  fetching: leaderboard.fetching,
  fetchingError: leaderboard.fetchingError,
  fetchingSuccess: leaderboard.fetchingSuccess,
  leaderboardData: leaderboard.leaderboardData,
});

const mapDispatchToProps = {
  exitNotLocationsView, getLeaderboardData,
};

export default connect(mapDispathToProps, mapDispatchToProps)(Leaderboard);

