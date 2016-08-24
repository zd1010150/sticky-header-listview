import _ from 'lodash';
import { LIST_DATA, DELETE_ITEM } from './constants';

const initState = {
  list: [],
};
export default function homeReducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case LIST_DATA:
      return _.assign({}, state, { list: payload.list });
    case DELETE_ITEM:
      return {
        list: _.reject(state.list, { id: payload.id }),
      };
    default:
      return state;
  }
}
