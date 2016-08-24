import _ from 'lodash';
import util from 'core/util';
import {
  LIST_FOCUS,
  SHOW_FILTER,
  HIDE_FILTER,
  CHANGE_FILTER,
  SET_CHARTGROUP,
  CANCEL_FOCUS,
  IS_SHOW_GUIDE,
} from './constants';

const urlParams = util.url.parse(location.search);
const defaultDate = urlParams.ds ? urlParams.ds : util.date.getDefaultDate();

const setChartGroup = (state, payload) => {
  const focusSet = state.focusSet;
  focusSet[payload.chartGroupId].yFields = payload.yFields;
  return _.assign({}, state, { focusSet });
};
const removeChartGroupField = (state, payload) => {
  const { chartGroupId, fieldName } = payload;
  let focusSet = state.focusSet;
  if (focusSet) {
    if (focusSet[chartGroupId]) {
      const yFields = _.reject(focusSet[chartGroupId].yFields, { name: fieldName });
      if (_.isEmpty(yFields)) {
        focusSet = _.omit(focusSet, [chartGroupId]);
      } else {
        focusSet[chartGroupId].yFields = yFields;
      }
      return _.assign({}, state, { focusSet });
    }
  }
  return state;
};
const initialState = {
  focusSet: null,
  isShowFilter: true,
  currentDateOptions: {
    mode: 'day',
    startDate: defaultDate,
    endDate: defaultDate,
  },
};
export default function focusReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LIST_FOCUS:
      return _.assign({}, state, {
        focusSet: payload.focusSet,
        showLoading: false,
      });
    case SET_CHARTGROUP:
      return setChartGroup(state, payload);
    case SHOW_FILTER:
      return _.assign({}, state, {
        isShowFilter: true,
      });
    case HIDE_FILTER:
      return _.assign({}, state, {
        isShowFilter: false,
      });
    case CHANGE_FILTER:
      if (_.isNil(payload.currentDateOptions)) {
        return state;
      }
      return _.assign({}, state, {
        currentDateOptions: payload.currentDateOptions,
      });
    case CANCEL_FOCUS:
      return removeChartGroupField(state, payload);
    case IS_SHOW_GUIDE:
      return _.assign({}, state, {
        guide: payload.guide,
      });
    default:
      return state;
  }
}
