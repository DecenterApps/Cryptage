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
import { GP_LOCATION, GP_NO_LOCATIONS, GP_NO_NICKNAME } from '../../../actions/actionTypes';

class BoostersMenu extends React.Component {
  constructor(props) {
    super(props);

    this.exitBoosterView = this.exitBoosterView.bind(this);
  }

  componentWillMount() {
    this.props.getBoosters();
  }

  exitBoosterView() {
    let toGoView = GP_LOCATION;

    if (this.props.locations.length === 0) toGoView = GP_NO_LOCATIONS;
    if (!this.props.nickname) toGoView = GP_NO_NICKNAME;

    this.props.changeGameplayView(toGoView);
  }

  render() {
    const { boosters, isBuying, isFetching, revealedCards, isRevealing } = this.props.shop;
    const { accountBalance, revealBooster, buyBoosterPack, currentBlock } = this.props;
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
            isBuying={isBuying}
            isRevealing={isRevealing}
            isFetching={isFetching}
            revealBooster={revealBooster}
            buyBoosterPack={buyBoosterPack}
            accountBalance={accountBalance}
            currentBlock={currentBlock}
          />
        }
        {
          isReveal &&
          <Reveal
            exitBoosterView={this.exitBoosterView}
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
    isRevealing: PropTypes.bool,
  }).isRequired,
  getBoosters: PropTypes.func.isRequired,
  buyBoosterPack: PropTypes.func.isRequired,
  revealBooster: PropTypes.func.isRequired,
  accountBalance: PropTypes.string,
  nickname: PropTypes.string.isRequired,
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
  currentBlock: state.app.blockNumber,
  nickname: state.gameplay.nickname,
});

const mapDispatchToProps = {
  getBoosters,
  buyBoosterPack,
  revealBooster,
  changeGameplayView,
};

export default connect(mapStateToProps, mapDispatchToProps)(BoostersMenu);
