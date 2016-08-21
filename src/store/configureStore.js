import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import makeRootReducer from './reducers';

export default function configureStore(initialState = {}, history) {
  const store = createStore(
    makeRootReducer(),
    initialState,
    applyMiddleware(thunk, routerMiddleware(history)) // routerMiddleware redux 方式的回退
  );
  store.asyncReducers = {};

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;
}
