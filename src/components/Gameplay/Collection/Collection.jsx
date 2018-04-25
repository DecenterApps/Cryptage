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
import { fetchCardStats } from '../../../services/cardService';

const cardsLength = Object.keys(cardsConfig.cards).length;

const Collection = ({ cards, exitNotLocationsView, newCardTypes }) => (
  <div className="collection-wrapper">
    <HeaderBar title="My collection" color="#FF9D14" fontSize="13px" />

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
        range(0, cardsLength).map((cardIndex) => {
          const foundCard = cards.find(card => (parseInt(card.metadata.id, 10) === cardIndex));

          if (foundCard) {
            let occurences = 0;
            cards.map((card) => {
                if (parseInt(foundCard.metadata.id, 10) === parseInt(card.metadata.id, 10)) { occurences += 1; }
            });
            const newCard = cards.find(card =>
              (parseInt(card.metadata.id, 10) === cardIndex) && newCardTypes.includes(card.metadata.id));

            return (<LargeCard showNew={Boolean(newCard)} key={cardIndex} card={foundCard} showCount duplicates={occurences} />);
          }

          return (<div key={cardIndex} className="unknown" />);
        })
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
