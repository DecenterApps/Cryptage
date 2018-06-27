import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { classForRarity } from '../../../services/utils';
import { removeNewCardOnHover } from '../../../actions/removeCardActions';
import { rarities, typeGradients } from '../../../actions/actionTypes';

import './LargeCard.scss';
import LargeCardMain from '../../HoverInfo/LargeCardMain';

const LargeCard = ({
  card, showNew, removeNewCardOnHover, removeNew, showCount, duplicates,
}) => {
  return (
    <div
      className={`large-card-wrapper ${card.type.toLowerCase()}`}
      onMouseEnter={() => {
        if (!removeNew) return;

        removeNewCardOnHover(card.metadataId);
      }}
    >

      <div id="rarity" className={`rarity-overlay rarity-${classForRarity(card.rarityScore)}`} />

      <LargeCardMain
        typeColor={typeGradients[card.type.toLowerCase()][0]}
        rarityColor={rarities[classForRarity(card.rarityScore)]}
        id={card.id}
        image={`cardImages/${card.image}`}
      />

      { showNew && <div className="new-card"><span>new</span></div> }

      <div className="card-title">{card.title}</div>
      <div className="card-type">{card.type}</div>

      {
        showCount && duplicates > 1 &&
        <div className="count-wrapper">
          <div className="count">x{duplicates}</div>
        </div>
      }
    </div>
  );
};

LargeCard.defaultProps = {
  showNew: false,
  showCount: false,
  removeNew: true,
  duplicates: 0,
};

LargeCard.propTypes = {
  card: PropTypes.shape({}).isRequired,
  removeNewCardOnHover: PropTypes.func.isRequired,
  showNew: PropTypes.bool,
  removeNew: PropTypes.bool,
  showCount: PropTypes.bool,
  duplicates: PropTypes.number,
};

const mapDispatchToProps = {
  removeNewCardOnHover,
};

export default connect(null, mapDispatchToProps)(LargeCard);
