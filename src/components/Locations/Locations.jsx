import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleLocationDrop } from '../../actions/gameplayActions';
import { buyBoosterPack } from '../../actions/boosterActions';
import DropSlotsWrapper from '../DropSlotsWrapper/DropSlotsWrapper';
import LocationSidebarItem from '../LocationSidebarItem/LocationSidebarItem';
import EmptyLocationSlot from '../EmptyLocationSlot/EmptyLocationSlot';
import CircleSpinner from '../Decorative/CircleSpinner/CircleSpinner';

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
        <div className="bar-1" />
        <div className="bar-2" />
        <div className="bar-3" />
        <div className="bar-4" />
        <div className="bar-text">Locations</div>
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
