import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { buyBoosterPack } from '../../actions/boosterActions';
import DropSlotsWrapper from '../DropSlotsWrapper/DropSlotsWrapper';
import LocationSidebarItem from '../LocationSidebarItem/LocationSidebarItem';
import EmptyLocationSlot from '../EmptyLocationSlot/EmptyLocationSlot';
import FutureButton from '../FutureButton/FutureButton';
import HeaderLine from '../Decorative/HeaderLine';
import { GP_LEADERBOARD, GP_LOCATION_COLLECTION } from '../../actions/actionTypes';
import { handleLocationDrop } from '../../actions/dropActions';

import './Locations.scss';

const Locations = ({
  locationSlots, isBuying, buyBoosterPack, gameplayView, handleLocationDrop,
}) => (
  <div className="locations-wrapper">
    <div className="buy-booster-button-wrapper">
      <FutureButton
        text="Buy card pack"
        hoverText="Ξ 0.001"
        loading={isBuying}
        disabled={isBuying}
        handleClick={buyBoosterPack}
      />
    </div>

    {
      (gameplayView !== GP_LEADERBOARD &&
      gameplayView !== GP_LOCATION_COLLECTION) &&
      <div>
        <div key="locations-header" className="locations-header">
          <div className="bar-wrapper">
            <HeaderLine />
            <div className="section-header-main-text">Locations</div>
            {/* <div className="section-header-sub-text">Summary</div> */}
          </div>
        </div>
        <div key="active-locations-wrapper" className="active-locations-wrapper">

          <div className="vertical-line" />

          <DropSlotsWrapper
            dropSlots={locationSlots}
            element={<LocationSidebarItem />}
            onItemDrop={handleLocationDrop}
            emptyStateElem={<EmptyLocationSlot />}
            mainClass="location-slots-wrapper"
          />
        </div>
      </div>
    }
  </div>
);

Locations.propTypes = {
  locationSlots: PropTypes.array.isRequired,
  isBuying: PropTypes.bool.isRequired,
  buyBoosterPack: PropTypes.func.isRequired,
  gameplayView: PropTypes.string.isRequired,
  handleLocationDrop: PropTypes.func.isRequired,
};

const mapStateToProps = ({ gameplay, shop }) => ({
  locationSlots: [...gameplay.locationSlots],
  activeLocationIndex: gameplay.activeLocationIndex,
  gameplayView: gameplay.gameplayView,
  isBuying: shop.isBuying,
});

const mapDispatchToProp = {
  buyBoosterPack, handleLocationDrop,
};

export default connect(mapStateToProps, mapDispatchToProp)(Locations);
