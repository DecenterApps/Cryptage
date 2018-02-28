import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { usersCardsFetch } from '../../actions/appActions';
import HandCard from './HandCard/HandCard';
import { addLocation } from '../../actions/locationActions';

import './Cards.scss';

class Cards extends Component {
  componentDidMount() {
    this.props.usersCardsFetch();
  }

  render() {
    return (
      <div className="cards-wrapper">
        { this.props.cardsFetching && <div>Fetching cards...</div> }
        { this.props.cards.map((card, index) => (
          <div key={card.id} className="card-container">
            {
              card.stats.typeIndex === 2 &&
              <div
                className="location-card-wrapper"
                onClick={() => { this.props.addLocation(index, this.props.cards); }}
              >
                <HandCard card={card} />
              </div>
            }

            {
              card.stats.typeIndex !== 2 &&
              <div className="asset-wrapper">
                <HandCard card={card} />
              </div>
            }
          </div>
        )) }
      </div>
    );
  }
}

Cards.propTypes = {
  usersCardsFetch: PropTypes.func.isRequired,
  cards: PropTypes.array.isRequired,
  cardsFetching: PropTypes.bool.isRequired,
  addLocation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  cardsFetching: state.app.cardsFetching,
  cards: state.app.cards,
});

const mapDispatchToProps = {
  usersCardsFetch, addLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
