import serialise from 'serialijse';
import ContainerCard from './cardTypes/Container';

function getAllSlottedCards(card, slotted) {
  for (const slot of card.dropSlots) {
    if (!slot.isEmpty()) {
      slotted.push([slot, slot.card]);
      getAllSlottedCards(slot.card, slotted);
    }
  }
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

  dropCard(state, card, reSlotted = false) {
    if (this.card) {
      const leveledUp = card.levelUp(state, this);

      const slottedCards = [];
      getAllSlottedCards(this.card, slottedCards);

      let newState = this.removeCard(state);

      leveledUp.stackedCards.map((_stackedCard) => {
        const stackedCard = _stackedCard;
        stackedCard.slotted = true;
        return stackedCard;
      });

      newState = this.dropCard(newState, leveledUp);

      for (const [slot, card] of slottedCards) {
        newState = slot.dropCard(newState, card, true);
      }

      return newState;
    }

    this.card = card;
    this.card.parent = this.owner;

    if (this.owner) state = this.owner.onPlayChild(state, this.card);
    if (this.owner && card.level === 1 && this.owner.addNewDropSlot) this.owner.addNewDropSlot(this);

    if (this.card instanceof ContainerCard) this.acceptedTags = this.card.acceptedTags;

    state = state.playTurn(state, this, true);
    return this.card.onPlay(state, this, reSlotted);
  }

  removeCard(state) {
    if (!this.card) return state;

    if (this.owner) {
      state = this.owner.onWithdrawChild(state, this.card);
      if (this.owner.removeDropSlot) this.owner.removeDropSlot(this);
    }

    state = this.card.onWithdraw(state);
    state = state.playTurn(state, this, false);

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

    return this.card.canLevelUp(state, card);
  }

  isEmpty() {
    return !this.card;
  }
}

serialise.declarePersistable(CardSlot);
