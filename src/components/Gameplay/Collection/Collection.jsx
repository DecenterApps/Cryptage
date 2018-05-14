import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderBar from '../../HeaderBar/HeaderBar';
import CloseIcon from '../../CloseIcon/CloseIcon';
import LargeCard from '../../Cards/LargeCard/LargeCard';
import { range } from '../../../services/utils';
import cardsConfig from '../../../constants/cards.json';

import { exitNotLocationsView } from '../../../actions/gameplayActions';

import './Collection.scss';

const cardsLength = Object.keys(cardsConfig.cards).length;

const Collection = ({ cards, exitNotLocationsView, newCardTypes }) => (
  <div className="collection-wrapper">
    <HeaderBar title="My collection" color="#FF9D14" />

    <div onClick={exitNotLocationsView}>
      <CloseIcon />
    </div>

    <h1 className="collection-progress">
      {
        cards.reduce((cards, card) => {
          if (cards.indexOf(card.metadata.id) === -1) cards.push(card.metadata.id);
          return cards;
        }, []).length
      }<span>/</span>{ cardsLength }
    </h1>

    <div className="collection-cards-wrapper">
      {
        cardsConfig.cardTypes.map(cardType =>
          Object.keys(cardsConfig.cards)
            .filter(cardId => cardsConfig.cards[cardId]['1'].type === cardType)
            .map(cardId => cardId)
            .map((cardId) => {
              const foundCard = cards.find(card => card.metadata.id === cardId);

              if (foundCard) {
                const occurances = cards.reduce((acc, card) => {
                  if (card.metadata.id === cardId) acc += 1;
                  return acc;
                }, 0);

                const newCard = cards.find(card => (card.metadata.id === cardId) && newCardTypes.includes(card.metadata.id)); // eslint-disable-line

                return (<LargeCard
                  showNew={Boolean(newCard)}
                  key={cardId}
                  card={foundCard}
                  showCount
                  duplicates={occurances}
                />);
              }

              return (<div key={cardId} className="unknown" />);
          }))
      }
    </div>
  </div>
);

Collection.propTypes = {
  exitNotLocationsView: PropTypes.func.isRequired,
  cards: PropTypes.array.isRequired,
  newCardTypes: PropTypes.array.isRequired,

};

const mapStateToProps = ({ gameplay }) => ({
  cards: gameplay.allCards,
  newCardTypes: gameplay.newCardTypes,
});

const mapDispatchToProps = {
  exitNotLocationsView,
};

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
