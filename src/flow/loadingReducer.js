import _ from 'lodash';
import { HTTP_ACTION_DOING, HTTP_ACTION_DONE, HTTP_ACTION_ERROR } from './constants';

const initialState = {
  showLoading: false,
};
export default function loadingReducer(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case HTTP_ACTION_DOING:
      return _.assign({}, state, {
        showLoading: true,
      });
    case HTTP_ACTION_DONE:
      return _.assign({}, state, {
        showLoading: false,
      });
    case HTTP_ACTION_ERROR:
      return _.assign({}, state, {
        showLoading: false,
      });
    default:
      return state;
  }
}
