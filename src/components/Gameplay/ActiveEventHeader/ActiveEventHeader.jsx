import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import eventsData from '../../../constants/events.json';
import SmallButton from '../../SmallButton/SmallButton';
import ActiveEventHeaderBar from './ActiveEventHeaderBar';
import ActiveEventProgressVector from './ActiveEventProgressVector';
import SmallCircleButton from '../../SmallCircleButton/SmallCircleButton';
import ArrowDownVector from '../../Decorative/ArrowDownVector';

import './ActiveEventHeader.scss';

class ActiveEventHeader extends Component {
  constructor() {
    super();

    this.state = { dropDownOpen: false };

    this.toggleDropDown = this.toggleDropDown.bind(this);
  }

  toggleDropDown() {
    this.setState({ dropDownOpen: !this.state.dropDownOpen });
  }

  render() {
    const { id, expiryTime, blockNumber } = this.props;
    const { dropDownOpen } = this.state;

    const event = eventsData.events[id.toString()];
    const blocksLeft = expiryTime - blockNumber;

    return (
      <div className={`active-event-header-wrapper ${dropDownOpen ? 'dropdown-open' : 'dropdown-closed'}`}>
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
          <SmallCircleButton text="i" />
          <SmallButton text="SELL" />
        </div>

        <ActiveEventHeaderBar />
        <ActiveEventProgressVector className="progress" />

        <div className="dropdown">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A architecto assumenda eius minus molestiae
          obcaecati odit voluptates. Aperiam, eius eveniet ex facilis, id iusto laudantium maiores, molestiae pariatur
          veritatis voluptas.
        </div>

        <div className="arrows-wrapper" onClick={this.toggleDropDown}>
          <ArrowDownVector />
          <ArrowDownVector />
          <ArrowDownVector />
        </div>
      </div>
    );
  }
}

ActiveEventHeader.propTypes = {
  id: PropTypes.number.isRequired,
  expiryTime: PropTypes.number.isRequired,
  blockNumber: PropTypes.number.isRequired,
};

const mapStateToProps = ({ gameplay }) => ({
  blockNumber: gameplay.blockNumber,
});

export default connect(mapStateToProps)(ActiveEventHeader);