import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderBar from '../../HeaderBar/HeaderBar';
import LargeCard from '../../Cards/LargeCard/LargeCard';
import cardsConfig from '../../../constants/cards.json';
import SmallButton from '../../SmallButton/SmallButton';
import { getDataForTypeSorting, capitalize, compareCards } from '../../../services/utils';
import { exitNotLocationsView } from '../../../actions/gameplayActions';
import SortingDropdown from './SortingDropdown/SortingDropdown';
import { fetchCardStats } from '../../../services/cardService';

import './Collection.scss';

class Collection extends Component {
  constructor() {
    super();

    this.state = {
      selectedType: null,
    };

    this.onTypeSelect = this.onTypeSelect.bind(this);
  }

  onTypeSelect(dataItem) {
    this.setState({ selectedType: capitalize(dataItem.name) });
  }

  render() {
    const { cards, exitNotLocationsView } = this.props;
    const typeSortData = getDataForTypeSorting(cards);

    return (
      <div className="collection-wrapper">
        <HeaderBar title="My collection" />

        <div className="collection-inner-wrapper">
          <SortingDropdown onSelect={this.onTypeSelect} data={typeSortData} />

          <div className="collection-cards-wrapper">
            {
              Object.keys(cardsConfig.cards)
                .filter(cardId => cardsConfig.cards[cardId]['1'].type === this.state.selectedType
                                  || this.state.selectedType === 'All')
                .sort((a, b) => {
                  const A = fetchCardStats(a);
                  const B = fetchCardStats(b);
                  return compareCards(A, B);
                })
                .map((cardId) => {
                  const foundCard = cards.find(card => card.metadataId === cardId);

                  if (foundCard) {
                    const occurances = cards.reduce((acc, card) => {
                      if (card.metadataId === cardId) acc += 1;
                      return acc;
                    }, 0);

                    const newCard = cards.find(card => card.isNew);

                    return (<LargeCard
                      showNew={Boolean(newCard)}
                      key={cardId}
                      card={foundCard}
                      showCount
                      duplicates={occurances}
                    />);
                  }

                  return (<div key={cardId} className="unknown" />);
                })
            }
          </div>
        </div>

        <div className="button-wrapper">
          <div className="modal-buttons-bar" />

          <span onClick={exitNotLocationsView}>
            <SmallButton text="Back" />
          </span>
        </div>
      </div>
    );
  }
}

Collection.propTypes = {
  exitNotLocationsView: PropTypes.func.isRequired,
  cards: PropTypes.array.isRequired,

};

const mapStateToProps = ({ gameplay }) => ({
  cards: gameplay.cards,
});

const mapDispatchToProps = {
  exitNotLocationsView,
};

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
