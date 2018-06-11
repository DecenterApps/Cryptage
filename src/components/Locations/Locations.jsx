import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleLocationDrop } from '../../actions/dropActions';
import { buyBoosterPack } from '../../actions/boosterActions';
import DropSlotsWrapper from '../DropSlotsWrapper/DropSlotsWrapper';
import LocationSidebarItem from '../LocationSidebarItem/LocationSidebarItem';
import EmptyLocationSlot from '../EmptyLocationSlot/EmptyLocationSlot';
import CircleSpinner from '../Decorative/CircleSpinner/CircleSpinner';
import HeaderLine from '../Decorative/HeaderLine';

import './Locations.scss';

const Locations = ({
  locations, handleLocationDrop, isBuying, buyBoosterPack,
}) => (
  <div className="locations-wrapper">
    <div className="buy-boosters-wrapper">
      <button
        className="orange-button buy-booster-button"
        disabled={isBuying}
        onClick={buyBoosterPack}
      >
        BUY CARD PACK
      </button>

      { isBuying && <div className="buying-card-pack"><CircleSpinner /></div> }
    </div>

    <div className="locations-header">
      <div className="bar-wrapper">
        <HeaderLine />
        <div className="section-header-main-text">Locations</div>
        <div className="section-header-sub-text">Summary</div>
      </div>
    </div>

    <div className="active-locations-wrapper">
      <DropSlotsWrapper
        dropSlots={locations}
        onItemDrop={handleLocationDrop}
        element={<LocationSidebarItem />}
        emptyStateElem={<EmptyLocationSlot />}
        mainClass="location-slots-wrapper"
      />
    </div>
  </div>
);

Locations.propTypes = {
  locations: PropTypes.array.isRequired,
  handleLocationDrop: PropTypes.func.isRequired,
  isBuying: PropTypes.bool.isRequired,
  buyBoosterPack: PropTypes.func.isRequired,
};

const mapStateToProps = ({ gameplay, shop }) => ({
  locations: gameplay.locations,
  activeLocationIndex: gameplay.activeLocationIndex,
  isBuying: shop.isBuying,
});

const mapDispatchToProp = {
  handleLocationDrop, buyBoosterPack,
};

export default connect(mapStateToProps, mapDispatchToProp)(Locations);
