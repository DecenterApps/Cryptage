import React from 'react';
import PropTypes from 'prop-types';
import { formatBigNumber, classForRarity, guid } from '../../services/utils';
import { fpbCardIds, DESKTOP_WIDTH, rarities, typeGradients } from '../../actions/actionTypes';

import './HoverInfo.scss';
import LargeCardMain from './LargeCardMain';

const classForNumber = (_number) => {
  const number = parseInt(_number, 10);
  if (number >= 10000000) return 'small';
  if (number >= 1000000) return '';
  if (number >= 10000) return 'small';
  if (number >= 1000) return '';
  if (number >= 100) return 'smaller';
  return '';
};

const HoverInfo = ({
  card, center, parent, type,
}) => {
  const position = { top: 0, left: 0 };
  const isDesktop = window.innerWidth >= DESKTOP_WIDTH;
  const uniqueId = guid();

  if (parent) {
    const parentPos = parent.getBoundingClientRect();
    position.top = parentPos.top - 50;

    if (isDesktop) position.top -= 60;

    position.left = parentPos.left;
  }

  if (center) {
    position.top = '50%';
    position.left = '50%';
  }

  if (type === 'asset') position.left += 190;
  if (type === 'asset' && isDesktop) position.left += 100;

  if (type === 'project') position.left -= 250;
  if (type === 'project' && isDesktop) position.left -= 120;

  if (type === 'location') position.left += 215;
  if (type === 'location' && isDesktop) position.left += 120;

  const showCost = Object.keys(card.cost).filter((key) => {
    const valOverZero = key !== 'space' && key !== 'level' && card.cost[key] > 0;
    const spaceOverOne = key === 'space' && card.cost[key] > 1;
    const levelOverOne = key === 'level' && card.cost[key] > 1;
    const hideTime = key !== 'time';
    return hideTime && (spaceOverOne || levelOverOne || valOverZero);
  }).length > 0;

  return (
    <div
      className={`card-hover-info-wrapper ${center && 'center'} ${card.type.toLowerCase()}`}
      style={{ top: position.top, left: position.left }}
    >
      <div
        className="inner-wrapper"
      >

        <div className={`rarity-overlay ${classForRarity(card.rarityScore)}`} />

        <LargeCardMain
          typeColor={typeGradients[card.type.toLowerCase()][0]}
          rarityColor={rarities[classForRarity(card.rarityScore)]}
          id={card.id}
          image={`cardImages/${card.image}`}
        />

        <div className="card-level-wrapper">
          <span className="card-level-text">Level</span>
          <span className="card-level-val">{card.level}</span>
        </div>

        <div className="card-title">{card.title}</div>
        <div className="card-type">{card.type}</div>

        {
          card.cost &&
          showCost &&
          <div className="cost" data-name="Requires">
            {
              card.cost.space > 1 &&
              <div
                data-name="SPACE"
                className={`orb space ${classForNumber(card.cost.space)}`}
              >
                {formatBigNumber(card.cost.space)}
              </div>
            }
            {
              card.cost.power > 0 &&
              <div
                data-name="POWER"
                className={`orb power ${classForNumber(card.cost.power)}`}
              >
                {formatBigNumber(card.cost.power)}
              </div>
            }
            {
              card.cost.funds > 0 &&
              <div
                data-name="FUNDS"
                className={`orb funds ${classForNumber(card.cost.funds)}`}
              >
                {formatBigNumber(card.cost.funds)}
              </div>
            }
            {
              card.cost.level > 1 &&
              <div
                data-name="LEVEL"
                className={`orb level ${classForNumber(card.cost.level)}`}
              >
                {formatBigNumber(card.cost.level)}
              </div>
            }

            {
              card.cost.development > 0 &&
              <div
                data-name="DEV"
                className={`orb development ${classForNumber(card.cost.development)}`}
              >
                {formatBigNumber(card.cost.development)}
              </div>
            }
          </div>
        }
        {
          (card.values || card.bonus) &&
          card.type !== 'Container' &&
          <div className="gains" data-name="Gains">
            {
              card.values &&
              card.values.space > 0 &&
              <div
                data-name="SPACE"
                className={`orb space ${classForNumber(card.values.space)}`}
              >
                {formatBigNumber(card.values.space)}
              </div>
            }
            {
              card.values &&
              card.values.power > 0 &&
              <div
                data-name="POWER"
                className={`orb power ${classForNumber(card.values.power)}`}
              >
                {formatBigNumber(card.values.power)}
              </div>
            }
            {
              card.bonus &&
              card.bonus.funds > 0 &&
              card.metadata.id !== '43' &&
              <div
                data-name={fpbCardIds.includes(card.metadata.id) ? 'FPB' : 'FUNDS'}
                className={`orb funds ${classForNumber(card.bonus.funds)}`}
              >
                {formatBigNumber(card.bonus.funds)}
              </div>
            }
            {
              card.bonus &&
              card.bonus.funds > 0 &&
              card.metadata.id === '43' &&
              <div
                data-name={fpbCardIds.includes(card.metadata.id) ? 'FPB' : 'FUNDS'}
                className={`orb funds ${classForNumber(card.bonus.multiplierFunds)}`}
              >
                {formatBigNumber(card.bonus.multiplierFunds)}
              </div>
            }
            {
              card.bonus &&
              card.bonus.xp > 0 &&
              <div
                data-name="XP"
                className={`orb xp ${classForNumber(card.bonus.xp)}`}
              >
                {formatBigNumber(card.bonus.xp)}
              </div>
            }
            {
              card.bonus &&
              card.bonus.power > 0 &&
              <div
                data-name="POWER"
                className={`orb power ${classForNumber(card.bonus.power)}`}
              >
                {formatBigNumber(card.bonus.power)}
              </div>
            }
            {
              card.bonus &&
              card.bonus.development > 0 &&
              <div
                data-name="DEV"
                className={`orb development ${classForNumber(card.bonus.development)}`}
              >
                {formatBigNumber(card.bonus.development)}
              </div>
            }


            <div className="description">
              {
                card.mechanicsText &&
                <p className="mechanics">{card.mechanicsText}{/**/}</p>
              }
              {
                card.flavorText &&
                <p className="flavor">&ldquo;{card.flavorText}&ldquo;</p>
              }
            </div>
          </div>
        }
      </div>
    </div>
  );
};

HoverInfo.defaultProps = {
  center: false,
  parent: null,
  type: '',
};

HoverInfo.propTypes = {
  center: PropTypes.bool,
  parent: PropTypes.object,
  type: PropTypes.string,
  card: PropTypes.shape({}).isRequired,
};

export default HoverInfo;
