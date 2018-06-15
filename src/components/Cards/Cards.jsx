import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { usersCardsFetch } from '../../actions/gameplayActions';
import { getAvailableCards } from '../../services/gameMechanicsService';
import HandCard from './HandCard/HandCard';
import DragWrapper from '../DragWrapper/DragWrapper';
import Spinner from '../Spinner/Spinner';
import CardsTabGroup from '../Cards/CardsTabGroup/CardsTabGroup';
import { sortTypeGroupByPrice } from '../../services/utils';
import cardsConfig from '../../constants/cards.json';

import './Cards.scss';

class Cards extends Component {
  constructor() {
    super();

    const tabsToggleMap = {};

    for (const key of cardsConfig.cardTypes) {
      tabsToggleMap[key.toLowerCase()] = false;
    }
    tabsToggleMap.available = true;

    this.state = { tabsToggleMap };
  }

  componentDidMount() {
    this.props.usersCardsFetch();

    const that = this.innerCards;
    $(that).mousewheel((event, delta) => {
      that.scrollLeft -= (delta * 25);
      event.preventDefault();
    });
  }

  toggleTabOpen(tabName) {
    const newState = { ...this.state };
    newState.tabsToggleMap[tabName] = !newState.tabsToggleMap[tabName];
    this.setState(newState);
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

  groupCardsByType(cards) {
    const noDupliactes = this.groupDuplicates(cards);
    const {
      getAvailableCards, gameplayView, inGameplayView, locations, projects,
    } = this.props;
    let available = getAvailableCards(cards, gameplayView, inGameplayView, locations, projects);
    available = this.groupDuplicates(available);
    const starter = { available };
    const grouped = noDupliactes.reduce((_accumulator, item) => {
      const accumulator = { ..._accumulator };

      if (accumulator[item.stats.type]) accumulator[item.stats.type].push(item);
      else accumulator[item.stats.type] = [item];
      return accumulator;
    }, starter);

    Object.keys(grouped).forEach((key) => { grouped[key] = sortTypeGroupByPrice(grouped[key]); });

    return grouped;
  }

  render() {
    const { cardsFetching, cards } = this.props;
    const playerCards = this.groupCardsByType(cards);

    return (
      <div className="cards-wrapper">
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
              <span>You currently do not have any cards to left play.</span>
            </div>
          }

          {
            !cardsFetching && cards.length > 0 &&
            Object.keys(playerCards).map(type =>
              <CardsTabGroup
                toggleTab={() => { this.toggleTabOpen(type.toLowerCase()); }}
                open={this.state.tabsToggleMap[type.toLowerCase()]}
                key={`${type}-${playerCards[type].length}`}
                title={type}
                cards={playerCards[type]}
              />)
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
