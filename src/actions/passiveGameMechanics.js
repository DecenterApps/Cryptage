/**
 * Updates gameplay stats for each played location card that has
 * that defined
 *
 * @param cards
 */
export const handlePlayedLocationCardsPassive = cards => () => {
  console.log('Played location cards passive', cards);
};

/**
 * Updates gameplay stats for each played asset card that has
 * that defined
 *
 * @param cards
 */
export const handlePlayedAssetCardsPassive = cards => () => {
  console.log('Played asset cards passive', cards);
};
