import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { usersCardsFetch } from '../../actions/gameplayActions';
import { getAvailableCards } from '../../services/gameMechanicsService';
import Spinner from '../Spinner/Spinner';
import CardsTabGroup from '../Cards/CardsTabGroup/CardsTabGroup';
import { compareCategories, sortTypeGroupByPrice } from '../../services/utils';
import cardsConfig from '../../constants/cards.json';

import './Cards.scss';

class Cards extends Component {
  constructor() {
    super();

    const tabsToggleMap = {};

    cardsConfig.cardTypes.forEach((key) => { tabsToggleMap[key.toLowerCase()] = false; });

    tabsToggleMap.available = true;

    this.state = { tabsToggleMap };
  }

  componentDidMount() {
    this.props.usersCardsFetch();
  }

  toggleTabOpen(tabName) {
    const newState = { ...this.state };
    const currentActive = Object.keys(newState.tabsToggleMap).find(t => newState.tabsToggleMap[t]);
    if (currentActive === tabName) return false;
    newState.tabsToggleMap[currentActive] = false;
    newState.tabsToggleMap[tabName] = !newState.tabsToggleMap[tabName];
    this.setState(newState);
  }

  groupDuplicates(cards) {
    const noDupliactes = cards.reduce((_accumulator, item) => {
      const accumulator = _accumulator;

      if (accumulator[item.metadataId]) accumulator[item.metadataId].count += 1;
      else accumulator[item.metadataId] = Object.assign(item, { count: 1 });

      return accumulator;
    }, {});

    return Object.values(noDupliactes);
  }

  groupCardsByType(_cards) {
    const cards = _cards
      .filter(card => !card.active)
      .filter(card => !card.slotted);

    const noDupliactes = this.groupDuplicates(cards);
    const {
      getAvailableCards, locations, projects, gameplay,
    } = this.props;
    let available = getAvailableCards(locations, projects, gameplay);
    available = this.groupDuplicates(available);
    const starter = { available };
    const grouped = noDupliactes.reduce((_accumulator, item) => {
      const accumulator = { ..._accumulator };

      if (accumulator[item.type]) accumulator[item.type].push(item);
      else accumulator[item.type] = [item];
      return accumulator;
    }, starter);

    const sortedByType = Object.keys(grouped)
      .sort(compareCategories)
      .reduce((_result, key) => {
        const result = _result;

        result[key] = grouped[key];
        return result;
      }, {});

    Object.keys(sortedByType)
      .forEach((key) => {
        sortedByType[key] = sortTypeGroupByPrice(sortedByType[key]);
      });

    return sortedByType;
  }

  render() {
    const { cardsFetching, cards } = this.props;
    const playerCards = this.groupCardsByType(cards);

    return (
      <div className="cards-wrapper">
        <div className="cards-inner-wrapper">
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
            Object.keys(playerCards).map(type => (
              <CardsTabGroup
                toggleTab={() => { this.toggleTabOpen(type.toLowerCase()); }}
                open={this.state.tabsToggleMap[type.toLowerCase()]}
                key={`${type}-${playerCards[type].length}`}
                title={type}
                cards={playerCards[type]}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

Cards.propTypes = {
  gameplay: PropTypes.object.isRequired,
  usersCardsFetch: PropTypes.func.isRequired,
  cards: PropTypes.array.isRequired,
  cardsFetching: PropTypes.bool.isRequired,
  getAvailableCards: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
};

const mapStateToProps = ({ app, gameplay }) => ({
  gameplay,
  cardsFetching: app.cardsFetching,
  cards: gameplay.cards,
  gameplayView: gameplay.gameplayView,
  inGameplayView: gameplay.inGameplayView,
  locations: [...gameplay.locationSlots],
  projects: [...gameplay.projectSlots],
});

const mapDispatchToProps = {
  usersCardsFetch, getAvailableCards,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
