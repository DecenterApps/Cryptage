import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HandCard from '../Cards/HandCard/HandCard';
import { getAvailableCards, getCostErrors } from '../../services/gameMechanicsService';

const CanPlayCardChecker = ({
  card, globalStats, getAvailableCards, gameplayView, inGameplayView, locations, projects, activeLocationIndex,
  activeContainerIndex,
}) => {
  if (!card) return (<div />);

  let costErrors = null;
  const activeLocation = card.stats.type === 'Mining' ? locations[activeLocationIndex].lastDroppedItem : null;
  const ignoreSpace = card.stats.type === 'Mining';

  const canDrop = getAvailableCards([card], gameplayView, inGameplayView, locations, projects).length === 1;

  if (!canDrop) {
    costErrors = getCostErrors(card, activeLocationIndex, activeContainerIndex, locations, projects, gameplayView, inGameplayView, globalStats, activeLocation, ignoreSpace); // eslint-disable-line
  }

  return (
    <div className={`card-details type-${card.stats.type.toLowerCase()}`}>
      <HandCard costErrors={costErrors} card={card} />
    </div>
  );
};

CanPlayCardChecker.defaultProps = {
  card: null,
};

CanPlayCardChecker.propTypes = {
  card: PropTypes.object,
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
  globalStats: gameplay.globalStats,
  gameplayView: gameplay.gameplayView,
  inGameplayView: gameplay.inGameplayView,
  locations: gameplay.locations,
  projects: gameplay.projects,
  activeLocationIndex: gameplay.activeLocationIndex,
  activeContainerIndex: gameplay.activeContainerIndex,
});

const mapDispatchToProps = {
  getAvailableCards,
};

export default connect(mapStateToProps, mapDispatchToProps)(CanPlayCardChecker);
