import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import App from './components/App/App';

export const RoutesWrapper = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={App} />
      </Switch>
    </HashRouter>
  </Provider>
);

RoutesWrapper.propTypes = {
  store: PropTypes.object.isRequired,
};

export default RoutesWrapper;
