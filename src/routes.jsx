import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Splash from './components/Splash/Splash';
import Match from './components/Match/Match';
import Deck from './components/Deck/Deck';
import Store from './components/Store/Store';
import Game from './components/Game/Game';

class Routes extends Component {
  componentWillMount() {}

  render() {
    return (
      <Provider store={this.props.store}>
        <HashRouter>
          <Switch>
            <Route exact path="/" component={Splash} />
            <Route exact path="/match" component={Match} />
            <Route exact path="/deck" component={Deck} />
            <Route exact path="/store" component={Store} />
            <Route exact path="/game" component={Game}/>
          </Switch>
        </HashRouter>
      </Provider>
    );
  }
}

Routes.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Routes;
