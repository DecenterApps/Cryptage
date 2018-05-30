import CardSlot from '../CardSlot';
import MinerCard from '../cardTypes/Miner';

export default class ContainerCardSlot extends CardSlot {
  async canDrop(state, card) {
    return await super.canDrop(state, card) && (card instanceof MinerCard);
  }
}
