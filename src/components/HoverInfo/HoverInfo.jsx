import React from 'react';
import PropTypes from 'prop-types';
import { formatBigNumber, classNameForRarity, classForRarity } from '../../services/utils';
import { DESKTOP_WIDTH, typeGradients } from '../../actions/actionTypes';
import RarityBorder from '../Cards/RarityBorder/RarityBorder';

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
  let displayCard = null;

  if (card.bonus) {
    if (card.type === 'Project') {
      const bonus = Object.keys(card.bonus).reduce((_newObj, key) => {
        const newObj = _newObj;
        if (card.additionalBonuses[key]) newObj[key] = card.getGainsStatValue(key);
        return newObj;
      }, {});

      displayCard = { ...card, bonus };
    } else {
      const bonus = Object.keys(card.bonus).reduce((_newObj, key) => {
        const newObj = _newObj;
        if (card.additionalBonuses[key]) newObj[key] = card.getBonusStatValue(key);
        return newObj;
      }, {});

      displayCard = { ...card, bonus };
    }
  } else {
    displayCard = { ...card };
  }

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

  const showCost = Object.keys(displayCard.cost).filter((key) => {
    const valOverZero = key !== 'space' && key !== 'level' && displayCard.cost[key] > 0;
    const spaceOverOne = key === 'space' && displayCard.cost[key] > 1;
    const levelOverOne = key === 'level' && displayCard.cost[key] > 1;
    const hideTime = key !== 'time';
    return hideTime && (spaceOverOne || levelOverOne || valOverZero);
  }).length > 0;

  const showGains = (displayCard.values && (displayCard.values.space > 0 || displayCard.values.power > 0)) ||
                    (displayCard.bonus && (displayCard.bonus.funds > 0 || displayCard.bonus.funds > 0 ||
                                          displayCard.bonus.xp > 0 || displayCard.bonus.power > 0 ||
                                          displayCard.bonus.development > 0));

  const typeColor = typeGradients[displayCard.type.toLowerCase()][0];
  const borderColor = classForRarity(displayCard.rarityScore) !== 'normal' ? typeColor : '#9797FB';

  return (
    <div className={`
      card-hover-info-backdrop
      ${backdrop ? 'has-backdrop' : ''}
      ${delayHover ? 'delayed-backdrop' : ''}`}
    >
      <div
        className={`card-hover-info-wrapper ${center && 'center'} ${displayCard.type.toLowerCase()}`}
        style={{ top: position.top, left: position.left }}
      >
        <div
          className="inner-wrapper"
        >

          <RarityBorder card={card} />

          <LargeCardMain
            typeColor={typeColor}
            borderColor={borderColor}
            id={card.id}
            image={`cardImages/${displayCard.image}`}
          />

          {
            showLevel &&
            displayCard.type !== 'Container' &&
            displayCard.type !== 'Misc' &&
            <div className="card-level-wrapper">
              <span className="card-level-text">Level</span>
              <span className="card-level-val">{displayCard.level}</span>
            </div>
          }

          <div className="card-title">{displayCard.title}</div>
          <div className="card-type">{displayCard.type}</div>

          {
            displayCard.cost &&
            showCost &&
            <div className="cost" data-name="Requires">
              {
                displayCard.cost.space > 1 &&
                <div
                  data-name="SPACE"
                  className={`orb space ${classForNumber(displayCard.cost.space)}`}
                >
                  {formatBigNumber(displayCard.cost.space)}
                </div>
              }
              {
                displayCard.cost.power > 0 &&
                <div
                  data-name="POWER"
                  className={`orb power ${classForNumber(displayCard.cost.power)}`}
                >
                  {formatBigNumber(displayCard.cost.power)}
                </div>
              }
              {
                displayCard.cost.funds > 0 &&
                <div
                  data-name="FUNDS"
                  className={`orb funds ${classForNumber(displayCard.cost.funds)}`}
                >
                  {formatBigNumber(displayCard.cost.funds)}
                </div>
              }
              {
                displayCard.cost.level > 1 &&
                <div
                  data-name="LEVEL"
                  className={`orb level ${classForNumber(displayCard.cost.level)}`}
                >
                  {formatBigNumber(displayCard.cost.level)}
                </div>
              }

              {
                displayCard.cost.development > 0 &&
                <div
                  data-name="DEV"
                  className={`orb development ${classForNumber(displayCard.cost.development)}`}
                >
                  {formatBigNumber(displayCard.cost.development)}
                </div>
              }
            </div>
          }
          <div className="right-side">
            {
              showGains &&
              displayCard.type !== 'Container' &&
              <div className="gains" data-name="Gains">
                {
                  displayCard.values &&
                  displayCard.values.space > 0 &&
                  <div
                    data-name="SPACE"
                    className={`orb space ${classForNumber(displayCard.values.space)}`}
                  >
                    {formatBigNumber(displayCard.values.space)}
                  </div>
                }
                {
                  displayCard.values &&
                  displayCard.values.power > 0 &&
                  <div
                    data-name="POWER"
                    className={`orb power ${classForNumber(displayCard.values.power)}`}
                  >
                    {formatBigNumber(displayCard.values.power)}
                  </div>
                }
                {
                  displayCard.bonus &&
                  displayCard.bonus.xp > 0 &&
                  <div
                    data-name="XP"
                    className={`orb xp ${classForNumber(displayCard.bonus.xp)}`}
                  >
                    {formatBigNumber(displayCard.bonus.xp)}
                  </div>
                }
                {
                  displayCard.bonus &&
                  displayCard.bonus.power > 0 &&
                  <div
                    data-name="POWER"
                    className={`orb power ${classForNumber(displayCard.bonus.power)}`}
                  >
                    {formatBigNumber(displayCard.bonus.power)}
                  </div>
                }
                {
                  displayCard.bonus &&
                  displayCard.bonus.development > 0 &&
                  <div
                    data-name="DEV"
                    className={`orb development ${classForNumber(displayCard.bonus.development)}`}
                  >
                    {formatBigNumber(displayCard.bonus.development)}
                  </div>
                }
              </div>
            }
            <div className="description">
              <p className="rarity">Card rarity: <span>{classNameForRarity(displayCard.rarityScore)}</span></p>
              {
                displayCard.mechanicsText &&
                <p className="mechanics">{displayCard.mechanicsText}</p>
              }
              {
                displayCard.flavorText &&
                <p className="flavor">&ldquo;{displayCard.flavorText}&ldquo;</p>
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
