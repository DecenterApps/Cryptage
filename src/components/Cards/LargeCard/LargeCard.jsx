import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { classForRarity, rarityBorder } from '../../../services/utils';
import { removeNewCardOnHover } from '../../../actions/removeCardActions';
import { rarities, typeGradients } from '../../../actions/actionTypes';

import './LargeCard.scss';
import LargeCardMain from '../../HoverInfo/LargeCardMain';
import InfoCardIcon from '../../Decorative/InfoCardIcon';
import PortalWrapper from '../../PortalWrapper/PortalWrapper';
import HoverInfo from '../../HoverInfo/HoverInfo';


class LargeCard extends Component {
  constructor() {
    super();
    this.state = { showPortal: false };
    this.togglePortal = this.togglePortal.bind(this);
  }

  togglePortal(showOrHide) {
    console.log(showOrHide);
    this.setState({ showPortal: showOrHide });
  }

  render() {
    const {
      card, showNew, removeNewCardOnHover, removeNew, showCount, duplicates,
    } = this.props;

    const typeColor = typeGradients[card.stats.type.toLowerCase()][0];
    const borderColor = classForRarity(card.stats.rarityScore) !== 'normal' ? typeColor : '#9797FB';

    return (
      <div
        className={`large-card-wrapper ${card.stats.type.toLowerCase()}`}
        onMouseEnter={() => {
          if (!removeNew) return;

          removeNewCardOnHover(card.metadata.id);
        }}
      >

        <div
          style={{ backgroundImage: rarityBorder(card.stats) }}
          className="large-card-rarity rarity-overlay"
        />

        <LargeCardMain
          typeColor={typeColor}
          borderColor={borderColor}
          id={card.id}
          image={`cardImages/${card.stats.image}`}
        />

        { showNew && <div className="new-card"><span>new</span></div> }

        <div className="card-title">{card.stats.title}</div>
        <div className="card-type">{card.stats.type}</div>

        {
          showCount && duplicates > 1 &&
          <div className="count-wrapper">
            <div className="count">{duplicates}</div>
          </div>
        }
        <div
          className="actions"
          onClick={e => e.stopPropagation()}
        >
          <div
            className="hover-info-wrapper"
            onMouseEnter={() => { this.togglePortal(true); }}
            onMouseLeave={() => { this.togglePortal(false); }}
          >
            <InfoCardIcon />
          </div>
        </div>
        {
          this.state.showPortal &&
          <PortalWrapper>
            <HoverInfo card={card} center backdrop showLevel={false} />
          </PortalWrapper>
        }
      </div>
    );
  }
}

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
