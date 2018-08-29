import React, { Component } from 'react';
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
import sdk from '../../services/bitGuildPortalSDK_v0.1';
import { BigNumber } from 'bignumber.js';
import ethService from '../../services/ethereumService';

import './Locations.scss';

class Locations extends Component {
  constructor() {
    super();
    this.state = { price: 'Ξ 0.001' };
  }

  async componentDidMount() {
    const oracleContract = ethService.getOracleContract();
    const gwei = await oracleContract.methods.ETHPrice().call();
    const price = new BigNumber(gwei, 10);
    const amount = new BigNumber(price * 1e15 / 1e18);
    const PLATprice = amount / 1e18;

    sdk.isOnPortal()
      .then((isOnPortal) => {
        if (isOnPortal) {
          console.log('isOnPortal', isOnPortal)
          this.setState({
            price: `PLAT ${PLATprice}`
          })
        } else {
          return Promise.reject();
        }
      })
      .catch(() => {
        this.setState({
          price: 'Ξ 0.001' 
        })
      });
  }

  render () {
    const { locationSlots, isBuying, buyBoosterPack, gameplayView, handleLocationDrop } = this.props;

    return (
      <div className="locations-wrapper">
        <div className="buy-booster-button-wrapper" onClick={buyBoosterPack}>
          <FutureButton text="Buy card pack" hoverText={this.state.price} loading={isBuying} disabled={isBuying} />
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
    )
  }
}

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
