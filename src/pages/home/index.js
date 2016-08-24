import { injectReducer } from 'store/reducers';
import homeReducer from './flow/homeReducer';

import HomeView from './HomeView.jsx';

const loadHome = (store) => {
  injectReducer(store, {
    key: 'home',
    reducer: homeReducer,
  }); // 首页直接注入 reducer
  return HomeView;
};
export default loadHome;
