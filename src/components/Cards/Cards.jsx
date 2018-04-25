import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { usersCardsFetch } from '../../actions/gameplayActions';
import { getAvailableCards } from '../../services/gameMechanicsService';
import HandCard from './HandCard/HandCard';
import DragWrapper from '../DragWrapper/DragWrapper';
import Spinner from '../Spinner/Spinner';
import CardsTabGroup from '../Cards/CardsTabGroup/CardsTabGroup';

import './Cards.scss';

class Cards extends Component {
  constructor() {
    super();
    this.state = {
      tab: 'all',
    };
  }

  componentDidMount() {
    this.props.usersCardsFetch();

    const that = this.innerCards;
    $(that).mousewheel((event, delta) => {
      that.scrollLeft -= (delta * 25);
      event.preventDefault();
    });
  }

  groupDuplicates(cards) {
    const noDupliactes = cards.reduce((accumulator, item) => {
      if (accumulator[item.metadata.id]) accumulator[item.metadata.id].count++;
      else accumulator[item.metadata.id] = {
        ...item,
        count: 1,
      };
      return accumulator;
    }, {});
    return Object.values(noDupliactes);
  }

  filterAvailableCards(cards) {
    const noDupliactes = this.groupDuplicates(cards);
    const filtered = noDupliactes.filter((card) => {
      // TODO filter here
      return true;
    });
    return filtered;
  }

  groupCardsByType(cards) {
    const noDupliactes = this.groupDuplicates(cards);
    const grouped = noDupliactes.reduce((accumulator, item) => {
      if (accumulator[item.stats.type]) accumulator[item.stats.type].push(item);
      else accumulator[item.stats.type] = [item];
      return accumulator;
    }, {});
    return Object.values(grouped);
  }

  render() {
    const {
      cardsFetching, cards, getAvailableCards, gameplayView, inGameplayView, locations, projects,
      activeLocationIndex,
    } = this.props;

    const availableCards = getAvailableCards(cards, gameplayView, inGameplayView, locations, projects);
    const containerAndMinerCards = cards.filter(({ stats }) => stats.type === 'Mining' || stats.type === 'Container');

    return (
      <div className="cards-wrapper">
        <div className="card-tabs-wrapper">
          {
            [
              ['all', 'All'],
              ['available', 'Available'],
              ['location', 'Locations'],
              ['development', 'People'],
              ['project', 'Projects'],
              ['mining', 'Mining'],
              ['power', 'Power'],
              ['misc', 'Miscellaneous'],

            ].map(type => (
              <div
                key={type[0]}
                className={`tab ${this.state.tab === type[0] && 'active'}`}
                onClick={() => this.setState({ tab: type[0] })}
              >
                {type[1]}
              </div>
            ))
          }
        </div>
        <div className="cards-inner-wrapper" ref={(e) => { this.innerCards = e; }}>
          {
            cardsFetching &&
            <div className="loading-cards">
              <span>Fetching cards...</span>
              <Spinner color="white" size={3} />
            </div>
          }

          {
            !cardsFetching && cards.length === 0 &&
            <div className="no-cards">
              <span>You currently do not have any cards to play.</span>
            </div>
          }

          {
            !cardsFetching && cards.length > 0 &&
            this.state.tab === 'all' &&
            this.groupCardsByType(cards).map(type =>
              <CardsTabGroup key={`${type[0].stats.type}-${type.length}`} type={type} />)
          }

          {
            !cardsFetching && cards.length > 0 &&
            this.state.tab === 'available' &&
            this.groupCardsByType(availableCards).map(type =>
              <CardsTabGroup key={`${type[0].stats.type}-${type.length}`} type={type} />)
          }
          {

            !cardsFetching && cards.length > 0 &&
            this.state.tab === 'mining' &&
            this.groupCardsByType(containerAndMinerCards).map(type =>
              <CardsTabGroup key={`${type[0].stats.type}-${type.length}`} type={type} />)
          }

          {
            !cardsFetching && cards.length > 0 &&
            this.state.tab !== 'all' &&
            this.state.tab !== 'available' &&
            this.state.tab !== 'mining' &&
            this.groupDuplicates(cards.filter(card => card.stats.type.toLowerCase() === this.state.tab))
              .map(card => (
                <div key={card.id} className="card-container">
                  <DragWrapper key={card.id} {...{ card }}>
                    <HandCard inHand card={card} hoverCentered />
                  </DragWrapper>
                </div>
            ))
          }
        </div>
      </div>
    );
  }
}

Cards.propTypes = {
  usersCardsFetch: PropTypes.func.isRequired,
  cards: PropTypes.array.isRequired,
  cardsFetching: PropTypes.bool.isRequired,
  getAvailableCards: PropTypes.func.isRequired,
  gameplayView: PropTypes.string.isRequired,
  inGameplayView: PropTypes.string.isRequired,
  locations: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
  activeLocationIndex: PropTypes.number.isRequired,
};

const mapStateToProps = ({ app, gameplay }) => ({
  cardsFetching: app.cardsFetching,
  cards: gameplay.cards,
  gameplayView: gameplay.gameplayView,
  inGameplayView: gameplay.inGameplayView,
  locations: gameplay.locations,
  projects: gameplay.projects,
  activeLocationIndex: gameplay.activeLocationIndex,
});

const mapDispatchToProps = {
  usersCardsFetch, getAvailableCards,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
