import React from 'react';
import PropTypes from 'prop-types';
import { formatBigNumber, classForRarity, printMechanicsText, guid } from '../../services/utils';
import { fpbCardIds, DESKTOP_WIDTH } from '../../actions/actionTypes';

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

  const typeGradients = {
    misc:       ['#3215E6', 'rgba(49, 20, 230, 0)'],
    power:      ['#CE060D', 'rgba(206, 5, 13, 0)'],
    location:   ['#3CC8CC', 'rgba(60, 200, 204, 0)'],
    person:     ['#9F00C7', 'rgba(95, 38, 79, 0)'],
    project:    ['#878787', 'rgba(135, 135, 135, 0)'],
    mining:     ['#75341F', 'rgba(117, 52, 30, 0)'],
    container:  ['#4A7420', 'rgba(74, 116, 32, 0)'],
  }

  const rarities = {
    normal: '#9797FB',
    blue: '#0086D1',
    gold: '#9B01C1',
    red: '#FF9D14',
  };

  if (type === 'asset') position.left += 190;
  if (type === 'asset' && isDesktop) position.left += 100;

  if (type === 'project') position.left -= 250;
  if (type === 'project' && isDesktop) position.left -= 120;

  if (type === 'location') position.left += 215;
  if (type === 'location' && isDesktop) position.left += 120;

  const showCost = Object.keys(card.stats.cost).filter((key) => {
    const valOverZero = key !== 'space' && key !== 'level' && card.stats.cost[key] > 0;
    const spaceOverOne = key === 'space' && card.stats.cost[key] > 1;
    const levelOverOne = key === 'level' && card.stats.cost[key] > 1;
    const hideTime = key !== 'time';
    return hideTime && (spaceOverOne || levelOverOne || valOverZero);
  }).length > 0;

  // const mechanicsTextArr = printMechanicsText(card.stats.mechanicsText);

  return (
    <div
      className={`card-hover-info-wrapper ${center && 'center'} ${card.stats.type.toLowerCase()}`}
      style={{ top: position.top, left: position.left }}
    >
      <div
        className="inner-wrapper"
      >

        <LargeCardMain id={card.id} image={`cardImages/${card.stats.image}`} />


        {/*<div className="overlay" />*/}
        {/*<div className={`rarity-overlay rarity-${classForRarity(card.stats.rarityScore)}`} />*/}
        {/*<div className="title">{card.stats.title}</div>*/}
        <div className="card-level-wrapper">
          <span className="card-level-text">Level</span>
          <span className="card-level-val">{card.stats.level}</span>
        </div>

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


            <div className="description">
              {
                card.stats.mechanicsText &&
                <p className="mechanics">card.stats.mechanicsText</p>
              }
              {
                card.stats.flavorText &&
                <p className="flavor">&ldquo;{card.stats.flavorText}&ldquo;</p>
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
