import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderBar from '../../HeaderBar/HeaderBar';
import CloseIcon from '../../CloseIcon/CloseIcon';
import LargeCard from '../../Cards/LargeCard/LargeCard';
import { range } from '../../../services/utils';

import { changeGameplayView } from '../../../actions/gameplayActions';

import './Collection.scss';
import { GP_LOCATION, GP_NO_LOCATIONS } from '../../../actions/actionTypes';

class Collection extends React.Component {
  constructor(props) {
    super(props);

    this.exitBoosterView = this.exitBoosterView.bind(this);
  }

  componentWillMount() {
  }

  exitBoosterView() {
    const toGoView = this.props.locations.length === 0 ? GP_NO_LOCATIONS : GP_LOCATION;

    this.props.changeGameplayView(toGoView);
  }

  render() {
    const { cards } = this.props;

    return (
      <div className="collection-wrapper">
        <HeaderBar title="Collection" color="#FF9D14" fontSize="13px" />

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
  }
}

Collection.propTypes = {
  changeGameplayView: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired,
  cards: PropTypes.array.isRequired,
};

Collection.defaultProps = {
};

const mapStateToProps = state => ({
  cards: state.gameplay.allCards,
  locations: state.gameplay.locations.filter(({ lastDroppedItem }) => lastDroppedItem !== null),
});

const mapDispatchToProps = {
  changeGameplayView,
};

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
