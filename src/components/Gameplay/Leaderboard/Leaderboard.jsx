import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeaderBar from '../../HeaderBar/HeaderBar';
import CloseIcon from '../../CloseIcon/CloseIcon';
import { exitNotLocationsView } from '../../../actions/gameplayActions';
import { guid } from '../../../services/utils';

import './Leaderboard.scss';

const mockData = [
  { nickname: 'nickname', level: 17, xp: 100 },
  { nickname: 'nickname', level: 16, xp: 99 },
  { nickname: 'nickname', level: 15, xp: 88 },
  { nickname: 'nickname', level: 14, xp: 86 },
  { nickname: 'nickname', level: 13, xp: 80 },
  { nickname: 'nickname', level: 10, xp: 65 },
  { nickname: 'nickname', level: 11, xp: 54 },
  { nickname: 'nickname', level: 9, xp: 41 },
  { nickname: 'nickname', level: 8, xp: 39 },
  { nickname: 'nickname', level: 7, xp: 36 },
  { nickname: 'nickname', level: 6, xp: 33 },
  { nickname: 'nickname', level: 5, xp: 27 },
  { nickname: 'nickname', level: 4, xp: 24 },
  { nickname: 'nickname', level: 3, xp: 14 },
  { nickname: 'nickname', level: 2, xp: 5 },
  { nickname: 'nickname', level: 1, xp: 1 },
];

const Leaderboard = ({ exitNotLocationsView }) => (
  <div className="leaderboard-wrapper">
    <HeaderBar title="Leaderboard" color="#FF9D14" fontSize="13px" />

    <div onClick={exitNotLocationsView}>
      <CloseIcon />
    </div>

    <div className="data-wrapper">
      <div className="data-header">
        <span className="nickname">Nickname</span>
        <span className="level">level</span>
        <span className="exp">exp</span>
      </div>

      <div className="data-table">
        {
          mockData.map(({ nickname, level, xp }, index) => (
            <div className="player-rank" key={guid()}>
              <div className="nickname">
                <span className="rank">{index + 1}.</span>
                <span className="text">{nickname}</span>
              </div>

              <div className="level">{level}</div>
              <div className="xp">{xp}</div>
            </div>
          ))
        }
      </div>
    </div>
  </div>
);

Leaderboard.propTypes = {
  exitNotLocationsView: PropTypes.func.isRequired,
};


const mapDispatchToProps = {
  exitNotLocationsView,
};

export default connect(null, mapDispatchToProps)(Leaderboard);

