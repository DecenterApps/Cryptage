import React from 'react';
import PropTypes from 'prop-types';
import { formatBigNumber, classNameForRarity, classForRarity } from '../../services/utils';
import { DESKTOP_WIDTH, typeGradients } from '../../actions/actionTypes';
import RarityBorder from '../Cards/RarityBorder/RarityBorder';
import BonusCostIcon from '../Decorative/BonusCostIcon/BonusCostIcon';

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
        if (card.gains[key] || card.additionalBonuses[key]) newObj[key] = card.getGainsStatValue(key);
        return newObj;
      }, {});

      displayCard = { ...card, bonus };
    } else {
      const bonus = Object.keys(card.bonus).reduce((_newObj, key) => {
        const newObj = _newObj;
        if (card.bonus[key] || card.additionalBonuses[key]) newObj[key] = card.getBonusStatValue(key);
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

  const showCost = Object.keys(displayCard.cost).filter((key) => {
    const valOverZero = key !== 'space' && key !== 'level' && displayCard.cost[key] > 0;
    const spaceOverOne = key === 'space' && displayCard.cost[key] > 1;
    const levelOverOne = key === 'level' && displayCard.cost[key] > 1;
    const hideTime = key !== 'time';
    return hideTime && (spaceOverOne || levelOverOne || valOverZero);
  }).length > 0;

  const showGains = (displayCard.values && (displayCard.values.space > 0 || displayCard.values.power > 0)) ||
                    (displayCard.bonus && Object.keys(displayCard.bonus).some(key => displayCard.bonus[key] > 0));

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
          <div className="modal-bar top" />
          <div className="hover-info-card-wrapper">
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
          </div>
          {
            displayCard.cost &&
            showCost &&
            <div className="left-side side" data-name="Cost">
              {
                displayCard.cost.space > 1 &&
                <div className={`orb space ${classForNumber(displayCard.cost.space)}`}>
                  <BonusCostIcon type="space" />
                  <div className="orb-meta">
                    <span>{formatBigNumber(displayCard.cost.space)}</span>
                    <span>SPACE</span>
                  </div>
                </div>
              }
              {
                displayCard.cost.power > 0 &&
                <div className={`orb power ${classForNumber(displayCard.cost.power)}`}>
                  <BonusCostIcon type="power" />
                  <div className="orb-meta">
                    <span>{formatBigNumber(displayCard.cost.power)}</span>
                    <span>POWER</span>
                  </div>
                </div>
              }
              {
                displayCard.cost.funds > 0 &&
                <div className={`orb funds ${classForNumber(displayCard.cost.funds)}`}>
                  <BonusCostIcon type="funds" />
                  <div className="orb-meta">
                    <span>{formatBigNumber(displayCard.cost.funds)}</span>
                    <span>FUNDS</span>
                  </div>
                </div>
              }
              {
                displayCard.cost.level > 1 &&
                <div className={`orb level ${classForNumber(displayCard.cost.level)}`}>
                  <BonusCostIcon type="level" />
                  <div className="orb-meta">
                    <span>{formatBigNumber(displayCard.cost.level)}</span>
                    <span>LEVEL</span>
                  </div>
                </div>
              }

              {
                displayCard.cost.development > 0 &&
                <div className={`orb development ${classForNumber(displayCard.cost.development)}`}>
                  <BonusCostIcon type="development" />
                  <div className="orb-meta">
                    <span>{formatBigNumber(displayCard.cost.development)}</span>
                    <span>DEV</span>
                  </div>
                </div>
              }
            </div>
          }
          <div className="right-side side" data-name="Gains">
            {
              showGains &&
              displayCard.type !== 'Container' &&
              <div className="gains">
                {
                  displayCard.values &&
                  displayCard.values.space > 0 &&
                  <div className={`orb space ${classForNumber(displayCard.values.space)}`}>
                    <BonusCostIcon type="space" />
                    <div className="orb-meta">
                      <span>{formatBigNumber(displayCard.values.space)}</span>
                      <span>SPACE</span>
                    </div>
                  </div>
                }
                {
                  displayCard.values &&
                  displayCard.values.power > 0 &&
                  <div className={`orb power ${classForNumber(displayCard.values.power)}`}>
                    <BonusCostIcon type="power" />
                    <div className="orb-meta">
                      <span>{formatBigNumber(displayCard.values.power)}</span>
                      <span>POWER</span>
                    </div>
                  </div>
                }
                {
                  displayCard.bonus &&
                  displayCard.bonus.experience > 0 &&
                  <div className={`orb xp ${classForNumber(displayCard.bonus.experience)}`}>
                    <BonusCostIcon type="experience" />
                    <div className="orb-meta">
                      <span>{formatBigNumber(displayCard.bonus.experience)}</span>
                      <span>EXP</span>
                    </div>
                  </div>
                }
                {
                  displayCard.bonus &&
                  displayCard.bonus.power > 0 &&
                  <div className={`orb power ${classForNumber(displayCard.bonus.power)}`}>
                    <BonusCostIcon type="power" />
                    <div className="orb-meta">
                      <span>{formatBigNumber(displayCard.bonus.power)}</span>
                      <span>POWER</span>
                    </div>
                  </div>
                }
                {
                  displayCard.bonus &&
                  displayCard.bonus.development > 0 &&
                  <div className={`orb development ${classForNumber(displayCard.bonus.development)}`}>
                    <BonusCostIcon type="development" />
                    <div className="orb-meta">
                      <span>{formatBigNumber(displayCard.bonus.development)}</span>
                      <span>DEV</span>
                    </div>
                  </div>
                }
                {
                  displayCard.bonus &&
                  displayCard.bonus.fundsPerBlock > 0 &&
                  <div className={`orb funds ${classForNumber(displayCard.bonus.fundsPerBlock)}`}>
                    <BonusCostIcon type="funds" />
                    <div className="orb-meta">
                      <span>{formatBigNumber(displayCard.bonus.fundsPerBlock)}</span>
                      <span>FPB</span>
                    </div>
                  </div>
                }
                {
                  displayCard.bonus &&
                  displayCard.bonus.funds > 0 &&
                  <div className={`orb funds ${classForNumber(displayCard.bonus.funds)}`}>
                    <BonusCostIcon type="funds" />
                    <div className="orb-meta">
                      <span>{formatBigNumber(displayCard.bonus.funds)}</span>
                      <span>{ displayCard.bonus.funds === 1 ? 'FUND' : 'FUNDS' }</span>
                    </div>
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
          <div className="modal-bar bottom" />
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
