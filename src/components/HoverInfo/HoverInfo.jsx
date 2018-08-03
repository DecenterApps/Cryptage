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
  card, center, parent, type, backdrop, showLevel, delayHover,
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

  // if (type === 'project') position.left -= 250;
  // if (type === 'project' && isDesktop) position.left -= 120;
  //
  // if (type === 'location') position.left += 215;
  // if (type === 'location' && isDesktop) position.left += 120;

  const showCost = Object.keys(card.stats.cost).filter((key) => {
    const valOverZero = key !== 'space' && key !== 'level' && card.stats.cost[key] > 0;
    const spaceOverOne = key === 'space' && card.stats.cost[key] > 1;
    const levelOverOne = key === 'level' && card.stats.cost[key] > 1;
    const hideTime = key !== 'time';
    return hideTime && (spaceOverOne || levelOverOne || valOverZero);
  }).length > 0;

  return (
    <div className={`
      card-hover-info-backdrop
      ${backdrop ? 'has-backdrop' : ''}
      ${delayHover ? 'delayed-backdrop' : ''}`}
    >
      <div
        className={`card-hover-info-wrapper ${center && 'center'} ${card.stats.type.toLowerCase()}`}
        style={{ top: position.top, left: position.left }}
      >
        <div
          className="inner-wrapper"
        >

          <div className={`rarity-overlay ${classForRarity(card.stats.rarityScore)}`} />

          <LargeCardMain
            typeColor={typeGradients[card.stats.type.toLowerCase()][0]}
            rarityColor={rarities[classForRarity(card.stats.rarityScore)]}
            id={card.id}
            image={`cardImages/${card.stats.image}`}
          />

          {
            showLevel &&
            card.stats.type !== 'Container' &&
            card.stats.type !== 'Misc' &&
            <div className="card-level-wrapper">
              <span className="card-level-text">Level</span>
              <span className="card-level-val">{card.stats.level}</span>
            </div>
          }

          <div className="card-title">{card.stats.title}</div>
          <div className="card-type">{card.stats.type}</div>

          {
            card.stats.cost &&
            showCost &&
            <div className="cost" data-name="Requires">
              {
                card.stats.cost.space > 1 &&
                <div
                  data-name="SPACE"
                  className={`orb space ${classForNumber(card.stats.cost.space)}`}
                >
                  {formatBigNumber(card.stats.cost.space)}
                </div>
              }
              {
                card.stats.cost.power > 0 &&
                <div
                  data-name="POWER"
                  className={`orb power ${classForNumber(card.stats.cost.power)}`}
                >
                  {formatBigNumber(card.stats.cost.power)}
                </div>
              }
              {
                card.stats.cost.funds > 0 &&
                <div
                  data-name="FUNDS"
                  className={`orb funds ${classForNumber(card.stats.cost.funds)}`}
                >
                  {formatBigNumber(card.stats.cost.funds)}
                </div>
              }
              {
                card.stats.cost.level > 1 &&
                <div
                  data-name="LEVEL"
                  className={`orb level ${classForNumber(card.stats.cost.level)}`}
                >
                  {formatBigNumber(card.stats.cost.level)}
                </div>
              }

              {
                card.stats.cost.development > 0 &&
                <div
                  data-name="DEV"
                  className={`orb development ${classForNumber(card.stats.cost.development)}`}
                >
                  {formatBigNumber(card.stats.cost.development)}
                </div>
              }
            </div>
          }
          <div className="right-side">
            {
              (card.stats.values || card.stats.bonus) &&
              card.stats.type !== 'Container' &&
              <div className="gains" data-name="Gains">
                {
                  card.stats.values &&
                  card.stats.values.space > 0 &&
                  <div
                    data-name="SPACE"
                    className={`orb space ${classForNumber(card.stats.values.space)}`}
                  >
                    {formatBigNumber(card.stats.values.space)}
                  </div>
                }
                {
                  card.stats.values &&
                  card.stats.values.power > 0 &&
                  <div
                    data-name="POWER"
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
                    data-name="POWER"
                    className={`orb power ${classForNumber(card.stats.bonus.power)}`}
                  >
                    {formatBigNumber(card.stats.bonus.power)}
                  </div>
                }
                {
                  card.stats.bonus &&
                  card.stats.bonus.development > 0 &&
                  <div
                    data-name="DEV"
                    className={`orb development ${classForNumber(card.stats.bonus.development)}`}
                  >
                    {formatBigNumber(card.stats.bonus.development)}
                  </div>
                }
              </div>
            }
            <div className="description">
              {
                card.stats.mechanicsText &&
                <p className="mechanics">{card.stats.mechanicsText}{/**/}</p>
              }
              {
                card.stats.flavorText &&
                <p className="flavor">&ldquo;{card.stats.flavorText}&ldquo;</p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HoverInfo.defaultProps = {
  center: false,
  parent: null,
  type: '',
  backdrop: false,
  showLevel: true,
  delayHover: false,
};

HoverInfo.propTypes = {
  center: PropTypes.bool,
  parent: PropTypes.object,
  type: PropTypes.string,
  card: PropTypes.shape({}).isRequired,
  backdrop: PropTypes.bool,
  showLevel: PropTypes.bool,
  delayHover: PropTypes.bool,
};

export default HoverInfo;
