import ethService from './ethereumService';
import cardsConfig from '../constants/cards.json';

export const fetchCardStats = (id, level = '1') => {
  const statsForCardExist = cardsConfig.cards[id.toString()];

  if (!statsForCardExist) throw ReferenceError(`No stats for card with ID ${id}`);

  const stats = { ...cardsConfig.cards[id.toString()][level.toString()] };
  stats.typeIndex = cardsConfig.cardTypes.findIndex(cardType => cardType === stats.type);

  return stats;
};

export const fetchCardMeta = async (id, level = 1) => {
  const fullMetadata = await ethService.getCardMetadata(id);
  const metadata = { 'id': fullMetadata[0] };
  const stats = fetchCardStats(metadata.id, level);

  return {
    id,
    metadata,
    ...stats,
  };
};

export const fetchCardsMeta = cardIDs => new Promise(async (resolve) => {
  const result = await Promise.all(cardIDs.map(id => fetchCardMeta(id)));

  resolve(result.sort((a, b) => b.typeIndex - a.typeIndex).reverse());
});

