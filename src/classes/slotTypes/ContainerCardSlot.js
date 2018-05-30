import CardSlot from '../CardSlot';
import MinerCard from '../cardTypes/Miner';

export default class ContainerCardSlot extends CardSlot {
  async canDrop(state, card) {
    const res = await super.canDrop(state, card);
    return {
      ...res,
      allowed: res.allowed && (card instanceof MinerCard),
    };
  }
}
