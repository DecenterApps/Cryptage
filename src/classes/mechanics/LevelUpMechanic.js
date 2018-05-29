import Mechanic from '../Mechanic';
import Card from '../Card';

export default class LevelUpMechanic extends Mechanic {
  async canPlay(state, dropSlot) {
    if (dropSlot.isEmpty()) {
      return { allowed: true };
    } else if (dropSlot.card.id !== this.id) {
      return { allowed: false };
    }

    const droppedCard = dropSlot.card;
    const result = { allowed: this.level < 5 };

    if (!result.allowed) return result;

    const instance = await Card.getInstance(droppedCard.id, droppedCard.level + 1);
    result.allowed = state.stats.funds >= instance.cost.funds;

    if (!result.allowed) return result;

    return Object.assign(result, this._can('canLevelUp', state, dropSlot));
  }

  async onPlay(state, dropSlot, draggedCard) {
    const leveledUp = await Card.getInstance(this.id, this.level + 1);
    leveledUp.dropSlots = this.dropSlots;
    leveledUp.stackedCards = this.stackedCards.concat(draggedCard.id);

    for (const cardSlot of this.dropSlots) {
      cardSlot.owner = leveledUp;
      if (!cardSlot.isEmpty()) {
        cardSlot.card.parent = leveledUp;
      }
    }

    leveledUp.onPlay(this.onWithdraw(state), dropSlot);
    return leveledUp;
  }
}

Mechanic.registerMechanic('levelUp', LevelUpMechanic);
