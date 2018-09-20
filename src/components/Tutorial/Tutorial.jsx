import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  changePage,
  finishTutorial,
} from '../../actions/tutorialsActions';

import './Tutorial.scss';

class Tutorial extends Component {
  render() {
    return (
      this.props.showTutorial &&
      <div className={`tutorial-wrapper ${this.props.showTutorial ? 'shown' : ''}`}>
        <div className="slider-wrapper">
          {
            this.props.pages.map((page, index) => (
              <div
                key={page}
                className={`slide
                  ${this.props.currentPage === index ? 'in-view' : ''}`}
              >
                <img draggable={false} src={`./tutorialImages/${page}`} alt="" />
                {
                  page === 'Step-07.14.jpg' &&
                  <p className="overlay-text">
                    Congratulations, you have now learned all the basics of Cryptage Origins
                    gameplay! But this certainly doesn’t mean there aren’t further surprises and
                    hidden gems laying around waiting to be discovered. You can keep advancing
                    through the levels naturally and see which new cards will be unlocked, but if
                    you are impatient you can always buy card packs and speed up your progress. And
                    since we are still on the Kovan test network, that’s not expensive at all :) You
                    can use our <a
                      href="https://faucet.selenean.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >faucet
                    </a> to obtain some free kETH.
                    <br /><br />
                    Also, don’t forget to check the leaderboard to see how you rank compared to
                    other players (available in the drop-down menu in the top right corner). But
                    first you will need to save your progress on the blockchain by clicking on the
                    SAVE button. Try it now!
                  </p>
                }
              </div>
            ))
          }
          <div className="buttons-wrapper">
            <button className="orange-button skip" onClick={this.props.finishTutorial}>Skip</button>
            <div>
              {
                this.props.currentPage > 0 &&
                <button className="orange-button" onClick={() => this.props.changePage('back')}>Back</button>
              }
              {
                this.props.currentPage + 1 < this.props.pages.length &&
                <button className="orange-button" onClick={() => this.props.changePage('next')}>Next</button>
              }
              {
                this.props.currentPage + 1 === this.props.pages.length &&
                <button className="orange-button" onClick={this.props.finishTutorial}>Finish</button>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Tutorial.propTypes = {
  pages: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
  finishTutorial: PropTypes.func.isRequired,
  showTutorial: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ gameplay, tutorials }) => ({
  level: gameplay.stats.level,
  pages: tutorials.pages,
  currentPage: tutorials.currentPage,
  showTutorial: tutorials.showTutorial,
});

const mapDispatchToProps = {
  changePage,
  finishTutorial,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);
