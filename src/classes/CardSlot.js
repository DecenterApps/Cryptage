import serialise from 'serialijse';
import ContainerCard from './cardTypes/Container';
import { calculateLevelData, getMilestoneLevel } from '../services/gameMechanicsService';

function getAllSlottedCards(card, slotted) {
  card.dropSlots.forEach((slot) => {
    if (!slot.isEmpty()) {
      slotted.push([slot, slot.card]);
      getAllSlottedCards(slot.card, slotted);
    }
  });
}

export default class CardSlot {
  constructor(owner, index = -1) {
    this.index = index;
    this.acceptedTags = [];

    if (owner) {
      this.owner = owner;
      this.acceptedTags = this.owner.acceptedTags;
    }
  }

  dropCard(_state, card, reSlotted = false) {
    let state = _state;

    if (this.card) {
      card.stackedCards.map((_stackedCard) => {
        const stackedCard = _stackedCard;
        stackedCard.slotted = true;
        return stackedCard;
      });

      this.card.stackedCards = [...this.card.stackedCards, ...card.stackedCards];

      return _state;
    }

    this.card = card;
    this.card.parent = this.owner;

    if (this.owner) state = this.owner.onPlayChild(state, this.card);
    if (this.owner && card.level === 1 && this.owner.addNewDropSlot) this.owner.addNewDropSlot(this);

    if (this.card instanceof ContainerCard) this.acceptedTags = this.card.acceptedTags;

    state = state.playTurn(state, this, true);
    return this.card.onPlay(state, this, reSlotted);
  }

  levelUp(_state, afterDelay = false) {
    const state = _state;
    const milestoneLevel = getMilestoneLevel(this.card.level + 1);
    const leveledUp = this.card.getLeveledInstance(state, this);
    const funds = state.stats.funds - leveledUp.calcUpgradeDiscount(leveledUp.cost.funds);

    if (!this.card.upgradeFinished && milestoneLevel) {
      this.card.upgradeExpiryTime = state.blockNumber + milestoneLevel.delay;
      state.stats.funds = funds;

      return state;
    }

    // maybe will be needed to drop card again
    leveledUp.upgradeFinished = false;

    state.stats.experience += leveledUp.cost.funds;

    state.stats = {
      ...state.stats,
      ...calculateLevelData(state.stats.experience),
      funds: afterDelay ? state.stats.funds : funds,
    };

    this.card = leveledUp;

    return this.card.onLevelUp(state, this);
  }

  removeCard(_state, isLevelUp = false) {
    let state = _state;

    if (!this.card) return state;

    if (this.owner) state = this.owner.onWithdrawChild(state, this.card);

    state = this.card.onWithdraw(state, isLevelUp);
    state = state.playTurn(state, this, false);

    if (this.card instanceof ContainerCard) this.acceptedTags = this.owner.acceptedTags;
    this.card.parent = null;
    this.card = null;

    return state;
  }

  canDrop(state, card) {
    if (this.isEmpty()) {
      const { acceptedTags } = this.owner || this;

      if (!acceptedTags.some(acceptedTag => card.tags.includes(acceptedTag))) {
        return { allowed: false, tags: false };
      }

      return card.canPlay(state, this);
    }

    return { allowed: true };
  }

  isEmpty() {
    return !this.card;
  }
}

serialise.declarePersistable(CardSlot);
