import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../../Spinner/Spinner';
import HeaderBar from '../../HeaderBar/HeaderBar';
import CloseIcon from '../../CloseIcon/CloseIcon';

import { getBoosters, buyBoosterPack, revealBooster } from '../../../actions/boosterActions';
import { changeGameplayView } from '../../../actions/gameplayActions';

import './BoostersMenu.scss';
import bgEmpty from './assets/bg-empty.png';
import bgLeft from './assets/bg-left.png';
import bgMiddle from './assets/bg-middle.png';
import bgRight from './assets/bg-right.png';
import ethCircle from '../GameplayHeader/eth-circle.png';
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
    const { boosters, isBuying, isFetching } = this.props.shop;
    const { accountBalance } = this.props;
    const images = [bgMiddle, bgLeft, bgRight];
    const classes = ['booster-middle', 'booster-left', 'booster-right'];

    return (
      <div className="booster-store-wrapper">
        <HeaderBar title="BUY" color="#FF9D14" fontSize="13px" />

        <div onClick={this.exitBoosterView}>
          <CloseIcon />
        </div>

        <div className="booster-store-body">
          <div className="boosters-wrapper">
            {(boosters.length === 0 && !isFetching) &&
            <div className="boosters">
              <div className="booster booster-middle">
                <img src={bgEmpty} alt="" />
                <p className="booster-empty-text">You <br /> don&apos;t <br /> have any boosters</p>
              </div>
            </div>
            }

            {
              boosters.length > 0 &&
              <div className="boosters">
                {
                  boosters.slice(0, 3).map((item, i) => (
                    <div className={`booster ${classes[i]}`} key={item.id}>
                      <img src={images[i]} alt="" />
                      <p className="booster-placeholder booster-text-gradient">Booster</p>
                      <button
                        onClick={() => this.props.revealBooster(item.id)}
                        className="open-booster-placeholder booster-text-gradient"
                      >
                        Open
                      </button>
                    </div>
                  ))
                }
                {/*{*/}
                {/*boosters.map(item => (*/}
                {/*<div className="flip-container" key={item.id}>*/}

                {/*<div className="flipper booster">*/}
                {/*<div className="front" style={{ backgroundImage: `url(${bg})` }}>*/}
                {/*<p className="booster-text-gradient">BOOSTER</p>*/}

                {/*{item.revealing &&*/}
                {/*<span>Revealing booster <Spinner color="white" size={2} /></span>}*/}
                {/*</div>*/}
                {/*<div className="back" style={{ backgroundImage: `url(${bgBack})` }}>*/}
                {/*<button*/}
                {/*disabled={item.revealing}*/}
                {/*onClick={() => this.props.revealBooster(item.id)}*/}
                {/*className="booster-reveal"*/}
                {/*>*/}
                {/*{!item.revealing && 'Reveal'}*/}
                {/*{item.revealing && 'revealing booster'}*/}
                {/*</button>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*))*/}
                {/*}*/}
              </div>
            }
          </div>
          <button className="orange-button booster-button" onClick={this.props.buyBoosterPack}>BUY
            BOOSTER
          </button>

          <div className="shop-funds">
            <img src={ethCircle}
                 alt="Ethereum logo circle" /> ETH {parseFloat(accountBalance).toFixed(2)}
          </div>


          {
            isFetching &&
            <div className="loading-wrapper">
              <span>Fetching boosters</span>
              <Spinner color="red" size={4} />
            </div>
          }
        </div>
      </div>
    );
  }
}

BoostersMenu.propTypes = {
  shop: PropTypes.shape({
    boosters: PropTypes.array,
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
