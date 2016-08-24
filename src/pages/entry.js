import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import 'styles/index.scss';
import configureStore from 'store/configureStore';

const store = configureStore({}, hashHistory);
const history = syncHistoryWithStore(hashHistory, store);

const MOUNT_NODE = document.getElementById('app');
const render = () => {
  const routes = require('./routes').default(store); // eslint-disable-line global-require

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history} children={routes} />
    </Provider>,
    MOUNT_NODE
  );
};

if (module.hot) {
  module.hot.accept('./routes', () => {
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE);
      render();
    });
  });
}
render();
