import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../../Spinner/Spinner';
import HeaderBar from '../../HeaderBar/HeaderBar';

import { getBoosters, buyBoosterPack, revealBooster } from '../../../actions/boosterActions';

import './BoostersMenu.scss';
import bg from './assets/booster-bg.png';
import bgBack from './assets/booster-bg-back.png';
import ethCircle from '../GameplayHeader/eth-circle.png';


class BoostersMenu extends React.Component {
  componentWillMount() {
    this.props.getBoosters();
  }

  render() {
    const { boosters, isBuying, isFetching } = this.props.shop;
    const { accountBalance } = this.props;

    return (
      <div className="booster-store-wrapper">
        <HeaderBar title="BUY" color="#FF9D14" fontSize="13px" />

        <div className="booster-store-body">
          <div className="boosters-wrapper">
            {(boosters.length === 0 && !isFetching) &&
            <h3 className="booster-text">You do not currently own any boosters.</h3>}

            {
              boosters.length > 0 &&
              <div className="boosters">
                {
                  boosters.map(item => (
                    <div className="flip-container" key={item.id}>

                      <div className="flipper booster">
                        <div className="front" style={{ backgroundImage: `url(${bg})` }}>
                          <p className="booster-text-gradient">BOOSTER</p>

                          {item.revealing &&
                          <span>Revealing booster <Spinner color="white" size={2} /></span>}
                        </div>
                        <div className="back" style={{ backgroundImage: `url(${bgBack})` }}>
                          <button
                            disabled={item.revealing}
                            onClick={() => this.props.revealBooster(item.id)}
                            className="booster-reveal"
                          >
                            {!item.revealing && 'Reveal'}
                            {item.revealing && 'revealing booster'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            }
          </div>
          <button className="booster-button booster-text-gradient" onClick={this.props.buyBoosterPack}>BUY
            BOOSTER
          </button>

          <div className="shop-funds">
            <img src={ethCircle} alt="Ethereum logo circle" /> ETH {parseFloat(accountBalance).toFixed(2)}
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
};

BoostersMenu.defaultProps = {
  accountBalance: '',
};

const mapStateToProps = state => ({
  shop: state.shop,
  accountBalance: state.app.accountBalance,
});

const mapDispatchToProps = {
  getBoosters,
  buyBoosterPack,
  revealBooster,
};

export default connect(mapStateToProps, mapDispatchToProps)(BoostersMenu);
