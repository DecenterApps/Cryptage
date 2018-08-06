import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleLocationDrop } from '../../actions/dropActions';
import { buyBoosterPack } from '../../actions/boosterActions';
import DropSlotsWrapper from '../DropSlotsWrapper/DropSlotsWrapper';
import LocationSidebarItem from '../LocationSidebarItem/LocationSidebarItem';
import EmptyLocationSlot from '../EmptyLocationSlot/EmptyLocationSlot';
import FutureButton from '../FutureButton/FutureButton';
import HeaderLine from '../Decorative/HeaderLine';
import { GP_LEADERBOARD, GP_LOCATION_COLLECTION } from '../../actions/actionTypes';

import './Locations.scss';

const Locations = ({
  locations, handleLocationDrop, isBuying, buyBoosterPack, gameplayView,
}) => (
  <div className="locations-wrapper">
    <div className="buy-booster-button-wrapper" onClick={buyBoosterPack}>
      <FutureButton text="Buy card pack" loading={isBuying} disabled={isBuying} />
    </div>

    {
      (gameplayView !== GP_LEADERBOARD &&
      gameplayView !== GP_LOCATION_COLLECTION) &&
      <div>
        <div key="locations-header" className="locations-header">
          <div className="bar-wrapper">
            <HeaderLine />
            <div className="section-header-main-text">Locations</div>
            <div className="section-header-sub-text">Summary</div>
          </div>
        </div>
        <div key="active-locations-wrapper" className="active-locations-wrapper">

          <div className="vertical-line" />

          <DropSlotsWrapper
            dropSlots={locations}
            onItemDrop={handleLocationDrop}
            element={<LocationSidebarItem />}
            emptyStateElem={<EmptyLocationSlot />}
            mainClass="location-slots-wrapper"
          />
        </div>
      </div>
    }
  </div>
);

Locations.propTypes = {
  locations: PropTypes.array.isRequired,
  handleLocationDrop: PropTypes.func.isRequired,
  isBuying: PropTypes.bool.isRequired,
  buyBoosterPack: PropTypes.func.isRequired,
  gameplayView: PropTypes.string.isRequired,
};

const mapStateToProps = ({ gameplay, shop }) => ({
  locations: gameplay.locations,
  activeLocationIndex: gameplay.activeLocationIndex,
  gameplayView: gameplay.gameplayView,
  isBuying: shop.isBuying,
});

const mapDispatchToProp = {
  handleLocationDrop, buyBoosterPack,
};

export default connect(mapStateToProps, mapDispatchToProp)(Locations);
