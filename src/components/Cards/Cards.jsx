import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { usersCardsFetch } from '../../actions/gameplayActions';
import HandCard from './HandCard/HandCard';
import DragWrapper from '../DragWrapper/DragWrapper';
import Spinner from '../Spinner/Spinner';

import './Cards.scss';

class Cards extends Component {
  componentDidMount() {
    this.props.usersCardsFetch();
  }

  groupCardsByType(cards) {
    const noDupliactes = cards.reduce((accumulator, item) => {
      if (accumulator[item.metadata.id]) accumulator[item.metadata.id].count++;
      else accumulator[item.metadata.id] = {
        ...item,
        count: 1,
      };
      return accumulator;
    }, {});
    const grouped = Object.values(noDupliactes).reduce((accumulator, item) => {
      if (accumulator[item.stats.type]) accumulator[item.stats.type].push(item);
      else accumulator[item.stats.type] = [item];
      return accumulator;
    }, {});
    return Object.values(grouped);
  }

  render() {
    const { cardsFetching, cards } = this.props;

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
          this.groupCardsByType(cards).map(type => (
            <div className="card-type-wrapper" key={`${type[0].stats.type}-${type.length}`}>
              <div className="card-type-title-wrapper">
                <h1 className="card-type-title">{type[0].stats.type}</h1>
              </div>
              {
                type.map(card => (
                  <div key={card.id} className="card-container">
                    <DragWrapper key={card.id} {...{ card }}>
                      <HandCard card={card} />
                    </DragWrapper>
                  </div>
                ))
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
};

const mapStateToProps = ({ app, gameplay }) => ({
  cardsFetching: app.cardsFetching,
  cards: gameplay.cards,
});

const mapDispatchToProps = {
  usersCardsFetch
};

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
