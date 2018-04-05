import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderBar from '../../HeaderBar/HeaderBar';
import CloseIcon from '../../CloseIcon/CloseIcon';
import LargeCard from '../../Cards/LargeCard/LargeCard';
import { range } from '../../../services/utils';

import { exitNotLocationsView } from '../../../actions/gameplayActions';

import './Collection.scss';

const Collection = ({ cards, exitNotLocationsView }) => (
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
      }<span>/</span>30
    </h1>

    <div className="collection-cards-wrapper">
      {
        range(0, 30).map((cardIndex) => {
          if (cards.find(card => card.metadata.id == cardIndex)) {
            return (<LargeCard key={cardIndex} card={cards.find(card => card.metadata.id == cardIndex)} />);
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
};

const mapStateToProps = state => ({
  cards: state.gameplay.allCards,
});

const mapDispatchToProps = {
  exitNotLocationsView,
};

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
