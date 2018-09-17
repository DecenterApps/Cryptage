import Mechanic from '../Mechanic';

export default class ProjectGlobalStatCardNum extends Mechanic {
  constructor(card, globalStat, cardsToWatch) {
    super(card);

    this.globalStat = globalStat;
    this.cardsToWatch = cardsToWatch;
  }

  onProjectEnd(_state) {
    const state = _state;
    const activeCards = state.cards.filter(card => card.active);

    this.cardsToWatch
      .forEach((cardToWatch) => {
        const occurrences = activeCards.reduce((_occurrence, activeCard) => {
          let occurrence = _occurrence;
          if (activeCard.title === cardToWatch[0]) occurrence += 1;
          return occurrence;
        }, 0);

        if (occurrences > 0) {
          state.stats[this.globalStat] += (occurrences * cardToWatch[1]);
        }
      });

    return state;
  }
}

Mechanic.registerMechanic('projectGlobalStatCardNum', ProjectGlobalStatCardNum);
