import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { usersCardsFetch } from '../../actions/appActions';
import HandCard from './HandCard/HandCard';
import DragWrapper from '../DragWrapper/DragWrapper';
import Spinner from '../Spinner/Spinner';
import { addLocation } from '../../actions/locationActions';

import './Cards.scss';

class Cards extends Component {
  componentDidMount() {
    this.props.usersCardsFetch();
  }

  render() {
    const { cardsFetching, cards } = this.props;
    const { addLocation } = this.props;

    return (
      <div className="cards-wrapper">
        {
          cardsFetching &&
          <div className="loading-cards">
            <span>Fetching cards...</span>
            <Spinner color="black" size={4} />
          </div>
        }

        {
          !cardsFetching && cards.length === 0 &&
          <div className="no-cards">
            You currently do not own any cards.
          </div>
        }

        {
          !cardsFetching && cards.length > 0 &&
          cards.map((card, index) => (
            <div key={card.id} className="card-container">
              {
                card.stats.typeIndex === 2 &&
                <div
                  className="location-card-wrapper"
                  onClick={() => { addLocation(index, cards); }}
                >
                  <HandCard card={card} />
                </div>
              }

              {
                card.stats.typeIndex !== 2 &&
                <div className="asset-wrapper">
                  <DragWrapper key={card.id} {...{ card }}>
                    <HandCard card={card} />
                  </DragWrapper>
                </div>
              }
            </div>
          ))
        }
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
