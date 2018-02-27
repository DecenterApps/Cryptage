import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.scss';

class App extends Component {
  componentDidMount() {
    console.log('Start App');
  }
  render() {
    return (
      <div>App</div>
    );
  }
}

App.propTypes = {};

export default connect(null, null)(App);
