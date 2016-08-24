import { push } from 'react-router-redux';
import _ from 'lodash';
import moment from 'moment';
import http from 'core/http';
import * as http2 from 'flow/httpAction';
import cookie from 'react-cookie';
import {
  LIST_FOCUS,
  SHOW_FILTER,
  HIDE_FILTER,
  CHANGE_FILTER,
  SET_CHARTGROUP,
  CANCEL_FOCUS,
  IS_SHOW_GUIDE,
} from './constants';

export const fetchChartGroup = (chartGroupId) => (dispatch, getState) => {
  const { currentDateOptions } = getState().focus;
  let params = { chartGroupId };
  if (!_.isNil(currentDateOptions)) {
    params = {
      chartGroupId,
      type: (currentDateOptions.mode || 'day').toUpperCase(),
      value: moment(currentDateOptions.endDate).format('YYYY-MM-DD'),
    };
  }
  http.get('/alid/sst/sstAttention/queryMyAttentionData', params)
    .then((data = {}) => {
      dispatch({
        type: SET_CHARTGROUP,
        payload: {
          chartGroupId,
          yFields: data.series || [],
        },
      });
    });
};

export const fetchFocus = () => (dispatch, getState) => {
  const { currentDateOptions } = getState().focus;
  let params = {};
  if (!_.isNil(currentDateOptions)) {
    params = {
      type: (currentDateOptions.mode || 'day').toUpperCase(),
      value: moment(currentDateOptions.endDate).format('YYYY-MM-DD'),
    };
  }

  http2.get('/alid/sst/sstAttention/queryMyAttentionInfoList', params, dispatch)
    .then((data = {}) => {
      const chartGroupsMap = {};
      _.each(data.chartGroups, (chartGroup, index) => {
        const { chartGroupId, tableCnName, yFields } = chartGroup;
        dispatch(fetchChartGroup(chartGroupId));
        chartGroupsMap[chartGroupId] = {
          chartGroupId,
          tableCnName,
          yFields,
          order: index,
        };
      });
      dispatch({
        type: LIST_FOCUS,
        payload: {
          focusSet: chartGroupsMap,
        },
      });
    });
};

export const isShowGuide = () => (dispatch) => {
  const isGuide = cookie.load('IS_GUIDED');
  if (isGuide) {
    dispatch({
      type: IS_SHOW_GUIDE,
      payload: {
        show: false,
      },
    });
    return;
  }
  cookie.save('IS_GUIDED', true, {
    path: '/',
    expires: new Date('Fri, 31 Dec 9999 23:59:59 GMT'),
  });

  http.get('/alid/sst/sstAttention/getUserAttentionTargetCount')
    .then((data = 0) => {
      dispatch({
        type: IS_SHOW_GUIDE,
        payload: {
          guide: {
            show: true,
            targetSize: data,
          },
        },
      });
    })
    .catch((err) =>
      console.error(err)
    );
};

export const cancelFocus = (chartGroupId, fieldName) => (dispatch) => {
  http.post('/alid/sst/sstAttention/cancelAttention', {
    chartGroupId,
    fieldNames: [fieldName],
  }, { 'Content-Type': 'application/json' })
  .then(() => {
    dispatch({
      type: CANCEL_FOCUS,
      payload: {
        chartGroupId,
        fieldName,
      },
    });
  });
};

export const showFilter = () => ({
  type: SHOW_FILTER,
});
export const hideFilter = () => ({
  type: HIDE_FILTER,
});
export const setMenu = () => (dispatch) => {
  const menuItems = [{
    id: '1',
    text: '日历',
  }, {
    id: '2',
    text: '更多',
  }];
  dd.biz.navigation.setMenu({
    items: menuItems,
    onSuccess: function onSuccess(data) {
      if (data.id === '1') {
        dispatch(showFilter());
      } else if (data.id === '2') {
        dispatch(push('/more'));
      }
    },
  });
};
export const changeFilter = ({
  currentDateOptions,
}) => (dispatch) => {
  dispatch({
    type: CHANGE_FILTER,
    payload: {
      currentDateOptions,
    },
  });
  dispatch(fetchFocus());
};
