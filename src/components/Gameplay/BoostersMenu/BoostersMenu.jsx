import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../../Spinner/Spinner';

import { getBoosters, buyBoosterPack, revealBooster } from '../../../actions/boosterActions';

import './BoostersMenu.scss';
import bg from './assets/booster-bg.png';
import bgBack from './assets/booster-bg-back.png';

class BoostersMenu extends React.Component {
  componentWillMount() {
    this.props.getBoosters();
  }

  render() {
    const { boosters, isBuying, isFetching } = this.props.shop;

    return (
      <div className="booster-store-wrapper">
        <div className="booster-store-header">
          <h1>Buy a booster:</h1>
          <button
            disabled={isBuying}
            onClick={this.props.buyBoosterPack}
          >
            { isBuying && <span><span>Buying booster...</span> <Spinner color="#000" size={2} /></span> }
            { !isBuying && 'Buy' }
          </button>
        </div>

        {
          isFetching &&
          <div className="loading-wrapper">
            <span>Fetching boosters</span>
            <Spinner color="red" size={4} />
          </div>
        }

        <div className="boosters-wrapper">
          { (boosters.length === 0 && !isFetching) && <h3>You do not currently own any boosters.</h3> }

          <div className="boosters">
            {
              boosters.map(item => (
                <div className="flip-container" key={item.id}>

                  <div className="flipper booster">
                    <div className="front" style={{ backgroundImage: `url(${bg})` }}>
                      <p className="booster-name">{item.name}</p>
                      <div className="booster-price">{item.price}</div>

                      { item.revelaing && <span>Revealing booster <Spinner color="white" size={2} /></span> }
                    </div>
                    <div className="back" style={{ backgroundImage: `url(${bgBack})` }}>
                      <button
                        disabled={item.revelaing}
                        onClick={() => this.props.revealBooster(item.id)}
                        className="booster-reveal"
                      >
                        { !item.revelaing && 'Reveal'}
                        { item.revelaing && 'revealing booster' }
                      </button>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
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
};

BoostersMenu.defaultProps = {};

const mapStateToProps = state => ({
  shop: state.shop,
});

const mapDispatchToProps = {
  getBoosters,
  buyBoosterPack,
  revealBooster,
};

export default connect(mapStateToProps, mapDispatchToProps)(BoostersMenu);
