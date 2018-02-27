import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { usersCardsFetch } from '../../actions/appActions';
import HandCard from './HandCard/HandCard';

import './Cards.scss';

class Cards extends Component {
  componentDidMount() {
    this.props.usersCardsFetch();
  }

  render() {
    return (
      <div className="cards-wrapper">
        { this.props.cardsFetching && <div>Fetching cards...</div> }
        { this.props.cards.map(card => (<HandCard key={card.id} card={card} />)) }
      </div>
    );
  }
}

Cards.propTypes = {
  usersCardsFetch: PropTypes.func.isRequired,
  cards: PropTypes.array.isRequired,
  cardsFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  cardsFetching: state.app.cardsFetching,
  cards: state.app.cards,
});

const mapDispatchToProps = {
  usersCardsFetch,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
