
export default class CardSlot {

  constructor(card) {
    if (card) {
      this.dropCard(card);
    }
  }

  dropCard(card) {
    this.card = card;
  }

  isEmpty() {
    return !!this.card;
  }
}

export class LocationCardSlot extends CardSlot {

}
