import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { formatBigNumber, printMechanicsText, classForRarity } from '../../../services/utils';
import { removeNewCardOnHover } from '../../../actions/removeCardActions';
import { fpbCardIds } from '../../../actions/actionTypes';

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

const LargeCard = ({
  card, showNew, removeNewCardOnHover, removeNew, showCount, duplicates,
}) => {
  const mechanicsTextArr = printMechanicsText(card.stats.mechanicsText);
  return (
    <div
      className={`large-card-wrapper ${card.stats.type.toLowerCase()}`}
      style={{ backgroundImage: `url('cardImages/${card.stats.image}')` }}
      onMouseEnter={() => {
        if (!removeNew) return;

        removeNewCardOnHover(card.metadata.id);
      }}
    >
      <div className="overlay" />
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
            card.metadata.id !== '43' &&
            <div
              data-name={fpbCardIds.includes(card.metadata.id) ? 'FPB' : 'FUNDS'}
              className={`orb funds ${classForNumber(card.stats.bonus.funds)}`}
            >
              {formatBigNumber(card.stats.bonus.funds)}
            </div>
          }
          {
            card.stats.bonus &&
            card.stats.bonus.funds > 0 &&
            card.metadata.id === '43' &&
            <div
              data-name={fpbCardIds.includes(card.metadata.id) ? 'FPB' : 'FUNDS'}
              className={`orb funds ${classForNumber(card.stats.bonus.multiplierFunds)}`}
            >
              {formatBigNumber(card.stats.bonus.multiplierFunds)}
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
              { mechanicsTextArr.length === 1 && mechanicsTextArr[0] }
              {
                mechanicsTextArr.length === 2 &&
                <span>{mechanicsTextArr[0]} <br /> {mechanicsTextArr[1]}</span>
              }
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
