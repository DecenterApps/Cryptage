import React from 'react';
import PropTypes from 'prop-types';
import { typeGradients } from '../../../actions/actionTypes';
import { classNameForRarity } from '../../../services/utils';
import Rare from './Rare';
import Scarce from './Scarce';
import Elite from './Elite';

const RarityBorder = ({ card }) => {
  const color = typeGradients[card.stats.type.toLowerCase()][0];
  const rarity = classNameForRarity(card.stats.rarityScore);
  return (
    <div className="rarity-overlay">
      { rarity === 'rare' && <Rare color={color} /> }
      { rarity === 'scarce' && <Scarce color={color} /> }
      { rarity === 'elite' && <Elite color={color} /> }
    </div>
  );
};

RarityBorder.propTypes = {
  card: PropTypes.object.isRequired,
};

export default RarityBorder;
