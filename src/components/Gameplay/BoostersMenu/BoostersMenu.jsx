import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../../Spinner/Spinner';
import Card from './BoosterCard/BoosterCard';

import { getBoosters, buyBoosterPack, revealBooster } from '../../../actions/boosterActions';

import './BoostersMenu.scss';
import bg from './assets/booster-bg.png';
import bgBack from './assets/booster-bg-back.png';

class BoostersMenu extends React.Component {
  componentWillMount() {
    this.props.getBoosters();
  }

  render() {
    const {
      cards, boosters, isBuying, isFetching, isRevealing,
    } = this.props.shop;

    return (
      <div className="booster-store-wrapper">
        <h1>Store</h1>
        <br />
        {
          isBuying ?
            <div>
              Buying booster...
              <Spinner color="#000" size={5} />
            </div> :
            <button onClick={this.props.buyBoosterPack}>Buy a booster</button>
        }
        <br />
        <br />
        <div className="cards">
          {
            isRevealing &&
            <div>
              Revealing booster...
              <Spinner color="#000" size={5} />
            </div>
          }
          {
            cards.length > 0 &&
            <div>
              {
                cards.map(card => (
                  <Card key={card.id} card={card}  />
                ))
              }
              <br />
              <Link to="/deck">Edit your deck</Link>
            </div>
          }
        </div>
        <br />
        <br />
        <h4>My boosters</h4>
        <div className="boosters">
          {
            boosters.map(item => (
              <div className="flip-container" key={item.id}>
                <div className="flipper booster">
                  <div className="front" style={{ backgroundImage: `url(${bg})` }}>
                    <p className="booster-name">{item.name}</p>
                    <div className="booster-price">{item.price}</div>
                  </div>
                  <div className="back" style={{ backgroundImage: `url(${bgBack})` }}>
                    <button
                      onClick={() => this.props.revealBooster(item.id)}
                      className="booster-reveal"
                    >
                      Reveal
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
          {
            isFetching &&
            <Spinner color="red" size={5} />
          }
        </div>
      </div>
    );
  }
}

BoostersMenu.propTypes = {
  shop: PropTypes.shape({
    cards: PropTypes.array,
    boosters: PropTypes.array,
    isBuying: PropTypes.bool,
    isFetching: PropTypes.bool,
    isRevealing: PropTypes.bool,
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
