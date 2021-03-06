import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import App from './components/App/App';
import NicknameForm from './components/Gameplay/NicknameForm/NicknameForm';
import ModalRoot from './components/Modals/ModalRoot';

const base = document.location.pathname;

export const RoutesWrapper = ({ store }) => (
  <div className="app-wrapper">
    <Provider store={store}>
      <div style={{ height: '100%' }}>
        <BrowserRouter basename={base}>
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/newuser" component={NicknameForm} />
          </Switch>
        </BrowserRouter>
        <ModalRoot />
      </div>
    </Provider>
  </div>
);

RoutesWrapper.propTypes = {
  store: PropTypes.object.isRequired,
};

export default RoutesWrapper;
