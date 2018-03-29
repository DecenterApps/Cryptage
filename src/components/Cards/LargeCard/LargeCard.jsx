import React from 'react';
import PropTypes from 'prop-types';
import { formatBigNumber } from '../../../services/utils';

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

const LargeCard = ({ card }) => (
  <div
    className={`large-card-wrapper ${card.stats.type.toLowerCase()}`}
    style={{ backgroundImage: `url('/cardImages/${card.stats.image}')` }}
  >
    {
      card.stats.cost &&
      <div className="cost" data-name="Cost">
        {
          card.stats.cost.space &&
          card.stats.cost.space > 1 &&
          <div
            data-name="Space"
            className={`orb blue ${classForNumber(card.stats.cost.space)}`}
          >
            {formatBigNumber(card.stats.cost.space)}
          </div>
        }
        {
          card.stats.cost.power &&
          <div
            data-name="Power"
            className={`orb red ${classForNumber(card.stats.cost.power)}`}
          >
            {formatBigNumber(card.stats.cost.power)}
          </div>
        }
        {
          card.stats.cost.funds &&
          <div
            data-name="Funds"
            className={`orb yellow ${classForNumber(card.stats.cost.funds)}`}
          >
            {formatBigNumber(card.stats.cost.funds)}
          </div>
        }
        {
          card.stats.cost.level &&
          card.stats.cost.level > 1 &&
          <div
            data-name="Level"
            className={`orb blue ${classForNumber(card.stats.cost.level)}`}
          >
            {formatBigNumber(card.stats.cost.level)}
          </div>
        }
        {
          card.stats.cost.time &&
          <div
            data-name="Time"
            className={`orb yellow ${classForNumber(card.stats.cost.time)}`}
          >
            {formatBigNumber(card.stats.cost.time)}
          </div>
        }
        {
          card.stats.cost.development &&
          <div
            data-name="Dev"
            className={`orb red ${classForNumber(card.stats.cost.development)}`}
          >
            {formatBigNumber(card.stats.cost.development)}
          </div>
        }
      </div>
    }
    {
      (card.stats.values || card.stats.bonus) &&
      <div className="gains" data-name="Gains">
        {
          card.stats.values &&
          card.stats.values.space &&
          <div
            data-name="Space"
            className={`orb blue ${classForNumber(card.stats.values.space)}`}
          >
            {formatBigNumber(card.stats.values.space)}
          </div>
        }
        {
          card.stats.values &&
          card.stats.values.power &&
          <div
            data-name="Power"
            className={`orb red ${classForNumber(card.stats.values.power)}`}
          >
            {formatBigNumber(card.stats.values.power)}
          </div>
        }
        {
          card.stats.bonus &&
          card.stats.bonus.funds &&
          <div
            data-name="Funds"
            className={`orb yellow ${classForNumber(card.stats.bonus.funds)}`}
          >
            {formatBigNumber(card.stats.bonus.funds)}
          </div>
        }
        {
          card.stats.bonus &&
          card.stats.bonus.xp &&
          <div
            data-name="XP"
            className={`orb yellow ${classForNumber(card.stats.bonus.xp)}`}
          >
            {formatBigNumber(card.stats.bonus.xp)}
          </div>
        }
        {
          card.stats.bonus &&
          card.stats.bonus.power &&
          <div
            data-name="Power"
            className={`orb red ${classForNumber(card.stats.bonus.power)}`}
          >
            {formatBigNumber(card.stats.bonus.power)}
          </div>
        }
        {
          card.stats.bonus &&
          card.stats.bonus.development &&
          <div
            data-name="Dev"
            className={`orb red ${classForNumber(card.stats.bonus.development)}`}
          >
            {formatBigNumber(card.stats.bonus.development)}
          </div>
        }
      </div>
    }
    <div className="meta">
      <div className="type">{card.stats.type}</div>
      <div className="meta-inner">
        <div className="title">{card.stats.title}</div>
        <div className="description">
          {card.stats.description}
        </div>
      </div>
    </div>
  </div>
);

LargeCard.defaultProps = {
  center: false,
};

LargeCard.propTypes = {
  center: PropTypes.bool,
  card: PropTypes.shape({}).isRequired,
};

export default LargeCard;
