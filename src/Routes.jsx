import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import App from './components/App/App';
import NicknameForm from './components/Gameplay/NicknameForm/NicknameForm';
import ModalRoot from './components/Modals/ModalRoot';

export const RoutesWrapper = ({ store }) => (
  <div className="app-wrapper">
    <Provider store={store}>
      <div style={{ height: '100%' }}>
        <HashRouter>
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/newuser" component={NicknameForm} />
          </Switch>
        </HashRouter>
        <ModalRoot />
      </div>
    </Provider>
  </div>
);

RoutesWrapper.propTypes = {
  store: PropTypes.object.isRequired,
};

export default RoutesWrapper;
