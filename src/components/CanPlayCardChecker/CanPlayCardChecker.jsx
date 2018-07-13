import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HandCard from '../Cards/HandCard/HandCard';
import { getAvailableCards, getCostErrors } from '../../services/gameMechanicsService';

const CanPlayCardChecker = ({ card, locations, projects, gameplay }) => {
  if (!card) return (<div />);

  const costErrors = getCostErrors(card, locations, projects, gameplay);

  return (
    <div className={`card-details type-${card.type.toLowerCase()}`}>
      <HandCard costErrors={costErrors} card={card} />
    </div>
  );
};

CanPlayCardChecker.defaultProps = {
  card: null,
};

CanPlayCardChecker.propTypes = {
  card: PropTypes.object,
  gameplay: PropTypes.object.isRequired,
  globalStats: PropTypes.object.isRequired,
  getAvailableCards: PropTypes.func.isRequired,
  gameplayView: PropTypes.string.isRequired,
  inGameplayView: PropTypes.string.isRequired,
  activeLocationIndex: PropTypes.number.isRequired,
  locations: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
  activeContainerIndex: PropTypes.number.isRequired,
};

const mapStateToProps = ({ gameplay }) => ({
  gameplay,
  globalStats: gameplay.stats,
  gameplayView: gameplay.gameplayView,
  inGameplayView: gameplay.inGameplayView,
  locations: [...gameplay.locationSlots],
  projects: [...gameplay.projectSlots],
  activeLocationIndex: gameplay.activeLocationIndex,
  activeContainerIndex: gameplay.activeContainerIndex,
});

const mapDispatchToProps = {
  getAvailableCards,
};

export default connect(mapStateToProps, mapDispatchToProps)(CanPlayCardChecker);
