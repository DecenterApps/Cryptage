import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { formatBigNumber } from '../../../services/utils';
import { removeNewCardOnHover } from '../../../actions/removeCardActions';

import './LargeCard.scss';

const classForNumber = (_number) => {
  const number = parseInt(_number, 10);
  if (number >= 10000000) return 'small';
  if (number >= 1000000) return '';
  if (number >= 10000) return 'small';
  if (number >= 1000) return '';
  if (number >= 100) return 'smaller';
  return '';
};

const classForRarity = (_rarity) => {
  const number = parseInt(_rarity, 10);
  if (number >= 900) return 'normal';
  if (number >= 576) return 'blue';
  if (number >= 485) return 'gold';
  return 'red';
};

const LargeCard = ({
  card, showNew, removeNewCardOnHover, removeNew, showCount, duplicates,
}) => (
  <div
    className={`large-card-wrapper ${card.stats.type.toLowerCase()}`}
    style={{ backgroundImage: `url('cardImages/${card.stats.image}')` }}
    onMouseEnter={() => {
      if (!removeNew) return;

      removeNewCardOnHover(card.metadata.id);
    }}
  >
    <div className={`rarity-overlay rarity-${classForRarity(card.stats.rarityScore)}`} />

    { showNew && <div className="new-card">new</div> }

    <div className="title">{card.stats.title}</div>
    {
      card.stats.cost &&
      <div className="cost" data-name="Cost">
        {
          card.stats.cost.space > 1 &&
          <div
            data-name="Space"
            className={`orb space ${classForNumber(card.stats.cost.space)}`}
          >
            {formatBigNumber(card.stats.cost.space)}
          </div>
        }
        {
          card.stats.cost.power > 0 &&
          <div
            data-name="Power"
            className={`orb power ${classForNumber(card.stats.cost.power)}`}
          >
            {formatBigNumber(card.stats.cost.power)}
          </div>
        }
        {
          card.stats.cost.funds > 0 &&
          <div
            data-name="Funds"
            className={`orb funds ${classForNumber(card.stats.cost.funds)}`}
          >
            {formatBigNumber(card.stats.cost.funds)}
          </div>
        }
        {
          card.stats.cost.level > 1 &&
          <div
            data-name="Level"
            className={`orb level ${classForNumber(card.stats.cost.level)}`}
          >
            {formatBigNumber(card.stats.cost.level)}
          </div>
        }

        {
          card.stats.cost.development > 0 &&
          <div
            data-name="Dev"
            className={`orb development ${classForNumber(card.stats.cost.development)}`}
          >
            {formatBigNumber(card.stats.cost.development)}
          </div>
        }
      </div>
    }
    {
      (card.stats.values || card.stats.bonus) &&
      card.stats.type !== 'Container' &&
      <div className="gains" data-name="Gains">
        {
          card.stats.values &&
          card.stats.values.space > 0 &&
          <div
            data-name="Space"
            className={`orb space ${classForNumber(card.stats.values.space)}`}
          >
            {formatBigNumber(card.stats.values.space)}
          </div>
        }
        {
          card.stats.values &&
          card.stats.values.power > 0 &&
          <div
            data-name="Power"
            className={`orb power ${classForNumber(card.stats.values.power)}`}
          >
            {formatBigNumber(card.stats.values.power)}
          </div>
        }
        {
          card.stats.bonus &&
          card.stats.bonus.funds > 0 &&
          <div
            data-name={
              (
                card.stats.type === 'Mining' ||
                (card.stats.special === true && card.stats.type !== 'Project')
              ) ? 'FPB' : 'Funds'}
            className={`orb funds ${classForNumber(card.stats.bonus.funds)}`}
          >
            {formatBigNumber(card.stats.bonus.funds)}
          </div>
        }
        {
          card.stats.bonus &&
          card.stats.bonus.xp > 0 &&
          <div
            data-name="XP"
            className={`orb xp ${classForNumber(card.stats.bonus.xp)}`}
          >
            {formatBigNumber(card.stats.bonus.xp)}
          </div>
        }
        {
          card.stats.bonus &&
          card.stats.bonus.power > 0 &&
          <div
            data-name="Power"
            className={`orb power ${classForNumber(card.stats.bonus.power)}`}
          >
            {formatBigNumber(card.stats.bonus.power)}
          </div>
        }
        {
          card.stats.bonus &&
          card.stats.bonus.development > 0 &&
          <div
            data-name="Dev"
            className={`orb development ${classForNumber(card.stats.bonus.development)}`}
          >
            {formatBigNumber(card.stats.bonus.development)}
          </div>
        }
      </div>
    }
    <div className="meta">
      <div className="description">
        {
          card.stats.flavorText &&
          <p className="flavor">&quot;{card.stats.flavorText}&quot;</p>
        }
        {
          card.stats.mechanicsText &&
          <p className="mechanics">
            {card.stats.mechanicsText}
          </p>
        }
      </div>
      {
        showCount && duplicates > 1 &&
        <div className="count-wrapper">
          <div className="count">{duplicates}x</div>
        </div>
      }
      <div className="type">{card.stats.type}</div>
    </div>
  </div>
);

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
