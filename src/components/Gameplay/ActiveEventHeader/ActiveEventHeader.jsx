import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import eventsData from '../../../constants/events.json';
import SmallButton from '../../SmallButton/SmallButton';
import ActiveEventHeaderBar from './ActiveEventHeaderBar';
import ActiveEventProgressVector from './ActiveEventProgressVector';

import './ActiveEventHeader.scss';

const ActiveEventHeader = ({ id, expiryTime, blockNumber }) => {
  const event = eventsData.events[id.toString()];
  const blocksLeft = expiryTime - blockNumber;

  return (
    <div className="active-event-header-wrapper">
      <div className="event-info-header">
        <div className={`type ${event.type.toLowerCase()}`}>
          <span className="label">Ongoing:</span>
          <span className="text">{ event.type }</span>
        </div>

        <div className="name">{event.name}</div>

        <div className="time">
          <span className="label">Timer:</span>
          <span className="text">{ blocksLeft } { blocksLeft === 1 ? 'Block' : 'Blocks' }</span>
        </div>
      </div>

      <div className="buttons-wrapper">
        <SmallButton text="SELL" />
      </div>

      <ActiveEventHeaderBar />
      <ActiveEventProgressVector className="progress" />
    </div>
  );
};

ActiveEventHeader.propTypes = {
  id: PropTypes.number.isRequired,
  expiryTime: PropTypes.number.isRequired,
  blockNumber: PropTypes.number.isRequired,
};

const mapStateToProps = ({ gameplay }) => ({
  blockNumber: gameplay.blockNumber,
});

export default connect(mapStateToProps)(ActiveEventHeader);