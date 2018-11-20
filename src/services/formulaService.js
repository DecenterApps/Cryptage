import cardConstants from '../constants/cardContants.json';

export const handleAssetFundsCostFormula = (cardVariable, level) => {
  const { milestoneUpgradeCostCoeff, masterFundsDifficultyCoeff } = cardConstants;
  const levelIndex = level - 1;

  const num = cardVariable * 2 ** (33.67169 + (-1.2814 - 33.67169) / (1 + (level / 122.1229) ** 0.7962835)) * milestoneUpgradeCostCoeff[levelIndex] * masterFundsDifficultyCoeff[levelIndex]; // eslint-disable-line

  return Math.floor(num);
};
