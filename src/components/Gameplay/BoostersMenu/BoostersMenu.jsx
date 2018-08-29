import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Boosters from './Boosters/Boosters';
import HeaderBar from '../../HeaderBar/HeaderBar';
import CloseIcon from '../../CloseIcon/CloseIcon';

import { getBoosters, buyBoosterPack, revealBooster } from '../../../actions/boosterActions';
import { exitNotLocationsView } from '../../../actions/gameplayActions';

import './BoostersMenu.scss';

class BoostersMenu extends React.Component {
  componentWillMount() {
    this.props.getBoosters();
  }

  render() {
    const {
      boosters, isBuying, isFetching, revealedCards, isRevealing,
    } = this.props.shop;
    const {
      revealBooster, buyBoosterPack, currentBlock, exitNotLocationsView,
    } = this.props;
    const isReveal = revealedCards.length > 0;

    return (
      <div className="booster-store-wrapper">
        <HeaderBar title={isReveal ? 'Open' : 'BUY'} color="#FF9D14" />

        <div onClick={exitNotLocationsView}>
          <CloseIcon />
        </div>

        <Boosters
          boosters={boosters}
          isBuying={isBuying}
          isRevealing={isRevealing}
          isFetching={isFetching}
          revealBooster={revealBooster}
          buyBoosterPack={buyBoosterPack}
          currentBlock={currentBlock}
        />
      </div>
    );
  }
}

BoostersMenu.propTypes = {
  shop: PropTypes.shape({
    boosters: PropTypes.array,
    revealedCards: PropTypes.array,
    isBuying: PropTypes.bool,
    isFetching: PropTypes.bool,
    isRevealing: PropTypes.bool,
  }).isRequired,
  getBoosters: PropTypes.func.isRequired,
  buyBoosterPack: PropTypes.func.isRequired,
  revealBooster: PropTypes.func.isRequired,
  exitNotLocationsView: PropTypes.func.isRequired,
  currentBlock: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  shop: state.shop,
  currentBlock: state.gameplay.blockNumber,
});

const mapDispatchToProps = {
  getBoosters,
  buyBoosterPack,
  revealBooster,
  exitNotLocationsView,
};

export default connect(mapStateToProps, mapDispatchToProps)(BoostersMenu);
