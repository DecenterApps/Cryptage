import ethService from './ethereumService';
import cardStats from '../constants/cards.json';
import { log } from './utils';

const deckSize = 8;

const fetchCardStats = id => {
  if (cardStats.cards[id.toString()]) {
    const stats = {...cardStats.cards[id.toString()]};
    stats.typeIndex = stats.type;
    stats.type = cardStats.cardTypes[stats.type];
    return stats;
  }
  console.error(`No stats for card with ID ${id}`);
  return {
    "title": "Unknown",
    "type": 'unknown',
    "image": 'unknown',
    "dev": 0,
    "sec": 0,
    "inf": 0,
    "cost": 0,
  }
};

const fetchCardMeta = async id => {
  const metadata = await ethService.getCardMetadata(id);
  const stats = fetchCardStats(metadata.id);
  return {
    id,
    type: `card-spade-${metadata.rarity}`, // currently not used
    metadata,
    stats,
  };
};

const fetchCardsMeta = cardIDs => new Promise(async (resolve) => {
  const result = await Promise.all(cardIDs.map(id => fetchCardMeta(id)));

  resolve(result.sort((a, b) => a.stats.typeIndex - b.stats.typeIndex).reverse());
});

const getDeck = async () => {
  const account = await ethService.getAccount();
  let deck = localStorage.getItem(`playerdeck-${account}`);
  if (deck && JSON.parse(deck).length) {
    deck = JSON.parse(deck);
    if (deck.length < deckSize) throw new Error(`Deck length is incorrect. There should be ${deckSize} cards instead of ${deck.length}`);
  } else {
    deck = await ethService.getUsersCards();
    deck = deck.slice(deckSize);
    if (deck.length < deckSize) throw new Error(`You do not own enough cards. There should be ${deckSize} cards instead of ${deck.length}`);
    deck = deck.slice(0, deckSize);
  }
  return fetchCardsMeta(deck);
};

const saveDeck = async (deck) => {
  const account = await ethService.getAccount();
  log(`Saving new deck: ${JSON.stringify(deck)}`);
  localStorage.setItem(`playerdeck-${account}`, JSON.stringify(deck));
};

export default {
  getDeck,
  saveDeck,
  fetchCardsMeta,
  deckSize,
};
