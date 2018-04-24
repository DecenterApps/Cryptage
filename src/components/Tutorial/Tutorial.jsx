import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleTutorial } from '../../actions/appActions';

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
    console.log(this.props.level);
    const pagesForLevel = {
      1: ['Step 01.jpg', 'Step 02.jpg', 'Step 03.jpg', 'Step 04.jpg', 'Step 05.jpg', 'Step 05a.jpg'],
      2: ['Step 06.jpg', 'Step 07.jpg', 'Step 07.1.jpg'],
      3: ['Step 07.2.jpg', 'Step 07.4.jpg', 'Step 07.7.jpg', 'Step 07.3.jpg'],
      4: ['Step 07.5.jpg', 'Step 07.8.jpg'],
      5: ['Step 07.6.jpg'],
      6: ['Step 07.9.jpg'],
      7: ['Step 07.10.jpg'],
      8: ['Step 07.11.jpg', 'Step 07.12.jpg', 'Step 07.14.jpg'],
    };

    if (!pagesForLevel[this.props.level]) return;

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
        <div className="buttons-wrapper">
          <button className="orange-button" onClick={() => this.finishTutorial()}>Skip</button>
        </div>
        <div className="slider-wrapper">
          {
            this.state.pages.map((page, index) => (
              <div
                key={page}
                className={`slide
                  ${this.state.shownPage === index ? 'shown' : ''}
                  ${this.state.pagesInView.indexOf(index) !== -1 ? 'in-view' : ''}`}
              >
                <img src={`./tutorialImages/${page}`} alt="" />
              </div>
            ))
          }
        </div>
        <div className="buttons-wrapper">
          {
            this.state.shownPage + 1 < this.state.pages.length &&
            <button className="orange-button" onClick={() => this.nextPage()}>Next</button>
          }
          {
            this.state.shownPage + 1 === this.state.pages.length &&
            <button className="orange-button" onClick={() => this.finishTutorial()}>Finish</button>
          }
          {
            this.state.shownPage > 0 &&
            <button className="orange-button" onClick={() => this.prevPage()}>Back</button>
          }
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
