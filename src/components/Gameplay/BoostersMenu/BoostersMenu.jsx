import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Boosters from './Boosters/Boosters';
import Reveal from './Reveal/Reveal';
import HeaderBar from '../../HeaderBar/HeaderBar';
import CloseIcon from '../../CloseIcon/CloseIcon';

import { getBoosters, buyBoosterPack, revealBooster } from '../../../actions/boosterActions';
import { changeGameplayView } from '../../../actions/gameplayActions';

import './BoostersMenu.scss';
import { GP_LOCATION, GP_NO_LOCATIONS } from '../../../actions/actionTypes';

class BoostersMenu extends React.Component {
  constructor(props) {
    super(props);

    this.exitBoosterView = this.exitBoosterView.bind(this);
  }

  componentWillMount() {
    this.props.getBoosters();
  }

  exitBoosterView() {
    const toGoView = this.props.locations.length === 0 ? GP_NO_LOCATIONS : GP_LOCATION;

    this.props.changeGameplayView(toGoView);
  }

  render() {
    const { boosters, isBuying, isFetching, revealedCards } = this.props.shop;
    const { accountBalance, revealBooster, buyBoosterPack } = this.props;
    const isReveal = revealedCards.length > 0;

    return (
      <div className="booster-store-wrapper">
        <HeaderBar title={isReveal ? 'Open' : 'BUY'} color="#FF9D14" fontSize="13px" />

        <div onClick={this.exitBoosterView}>
          <CloseIcon />
        </div>

        {
          !isReveal &&
          <Boosters
            boosters={boosters}
            isFetching={isFetching}
            revealBooster={revealBooster}
            buyBoosterPack={buyBoosterPack}
            accountBalance={accountBalance}
          />
        }
        {
          isReveal &&
          <Reveal
            revealedCards={revealedCards}
          />
        }
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
  }).isRequired,
  getBoosters: PropTypes.func.isRequired,
  buyBoosterPack: PropTypes.func.isRequired,
  revealBooster: PropTypes.func.isRequired,
  accountBalance: PropTypes.string,
  changeGameplayView: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired,
};

BoostersMenu.defaultProps = {
  accountBalance: '',
};

const mapStateToProps = state => ({
  shop: state.shop,
  accountBalance: state.app.accountBalance,
  locations: state.gameplay.locations.filter(({ lastDroppedItem }) => lastDroppedItem !== null),
});

const mapDispatchToProps = {
  getBoosters,
  buyBoosterPack,
  revealBooster,
  changeGameplayView,
};

export default connect(mapStateToProps, mapDispatchToProps)(BoostersMenu);
