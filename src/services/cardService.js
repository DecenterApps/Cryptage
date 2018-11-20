import ethService from './ethereumService';
import cardsConfig from '../constants/cards.json';
import newCardsConfig from '../constants/newCards.json';
import { handleAssetFundsCostFormula } from './formulaService';

/**
 * takes in a formula definition, card level and returns a value
 */
const formulaEngine = (formulaName, level) => {
  const parenthesisIndex = formulaName.indexOf('(');
  if (parenthesisIndex < 0) return formulaName;

  const formula = formulaName.slice(0, formulaName.indexOf('('));

  const params = (formulaName.match(/\(([^)]+)\)/)[1]).split(', ').map((param) => {
    const num = Number(param);
    return Number.isNaN(num) ? param : num;
  });

  if (formula === 'assetFundsCost') return handleAssetFundsCostFormula(...params, level);

  return 1;
};

/**
 * Checks if a bonus/values or cost property a formula or a value
 *
 * @param obj
 * @param level
 *
 * @return {Object}
 */
const formulaParser = (obj, level) => {
  const newObj = {};

  Object.keys(obj).forEach((key) => {
    const val = obj[key];

    newObj[key] = typeof val === 'string' ? formulaEngine(val, level) : val;
  });

  return newObj;
};

/**
 * Returns card data based on card id and card level
 *
 * @param id
 * @param cardLevel
 *
 * @return {*}
 */
export const fetchCardStats = (id, cardLevel = '1') => {
  const statsForCardExist = cardsConfig.cards[id.toString()];

  if (!statsForCardExist) throw ReferenceError(`No stats for card with ID ${id}`);

  let stats = {};

  stats.ID = id;
  stats.level = cardLevel;

  const useOld = newCardsConfig.cards[id.toString()] === undefined;

  // OLD STATS FOR CARDS THAT ARE NOT DEFINED IN THE NEW SHEET
  if (useOld) stats = { ...cardsConfig.cards[id.toString()]['1'] };
  else {
    stats = { ...newCardsConfig.cards[id.toString()] };

    // STILL USING OLD MECHANICS
    stats.mechanics = cardsConfig.cards[id.toString()]['1'].mechanics;
  }

  stats.typeIndex = cardsConfig.cardTypes.findIndex(cardType => cardType === stats.type);

  if (stats.values) stats.values = formulaParser(stats.values, cardLevel);
  if (stats.bonus) stats.bonus = formulaParser(stats.bonus, cardLevel);
  if (stats.cost) stats.cost = formulaParser(stats.cost, cardLevel);

  return stats;
};

export const fetchCardMeta = async (id, level = 1) => {
  const metadata = await ethService.getCardMetadata(id);
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

