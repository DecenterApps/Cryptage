import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleTutorial } from '../../actions/appActions';
import pagesForLevel from '../../constants/tutorialConfig.json';

import './Tutorial.scss';

class Tutorial extends Component {
  constructor() {
    super();
    this.state = {
      tutorialVisible: false,
      pages: [],
      pagesInView: [],
      shownPage: -1,
    };

    this.showPage.bind(this);
    this.nextPage.bind(this);
    this.prevPage.bind(this);
    this.finishTutorial.bind(this);
  }

  componentWillMount() {
    if (!pagesForLevel[this.props.level]) return this.props.toggleTutorial();

    this.setState({
      pages: pagesForLevel[this.props.level],
      pagesInView: [],
      shownPage: -1,
    });
    setTimeout(() => this.setState({ tutorialVisible: true }), 200);
    setTimeout(() => this.showPage(0), 500);
  }

  showPage(_page) {
    const page = parseInt(_page, 10);
    this.setState({
      pagesInView: [
        ...this.state.pagesInView,
        page,
      ],
      shownPage: page,
    });
  }

  nextPage() {
    if (this.state.shownPage + 1 >= this.state.pages.length) return;
    const newPage = this.state.shownPage + 1;
    this.setState({
      pagesInView: [
        ...this.state.pagesInView,
        newPage,
      ],
      shownPage: newPage,
    });
  }

  prevPage() {
    if (this.state.shownPage - 1 < 0) return;
    const newPage = this.state.shownPage - 1;
    this.setState({
      pagesInView: [
        ...this.state.pagesInView,
        newPage,
      ],
      shownPage: newPage,
    });
  }

  finishTutorial() {
    this.setState({ tutorialVisible: false });
    setTimeout(() => this.props.toggleTutorial(), 300);
  }

  render() {
    return (
      <div className={`tutorial-wrapper ${this.state.tutorialVisible ? 'shown' : ''}`}>
        <div className="slider-wrapper">
          {
            this.state.pages.map((page, index) => (
              <div
                key={page}
                className={`slide
                  ${this.state.shownPage === index ? 'shown' : ''}
                  ${this.state.pagesInView.indexOf(index) !== -1 ? 'in-view' : ''}`}
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
            <button className="orange-button skip" onClick={() => this.finishTutorial()}>Skip</button>
            <div>
              {
                this.state.shownPage > 0 &&
                <button className="orange-button" onClick={() => this.prevPage()}>Back</button>
              }
              {
                this.state.shownPage + 1 < this.state.pages.length &&
                <button className="orange-button" onClick={() => this.nextPage()}>Next</button>
              }
              {
                this.state.shownPage + 1 === this.state.pages.length &&
                <button className="orange-button" onClick={() => this.finishTutorial()}>Finish</button>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Tutorial.propTypes = {
  level: PropTypes.number.isRequired,
  toggleTutorial: PropTypes.func.isRequired,
};

const mapStateToProps = ({ gameplay }) => ({
  level: gameplay.globalStats.level,
});

const mapDispatchToProps = {
  toggleTutorial,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);
