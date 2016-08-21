import { injectReducer } from 'store/reducers';
import focusReducer from './flow/focusReducer';

import FocusView from './FocusView.jsx';

const loadFocus = (store) => {
  injectReducer(store, {
    key: 'focus',
    reducer: focusReducer,
  }); // 首页直接注入 reducer
  return FocusView;
};
export default loadFocus;
