import { LIST_DATA, DELETE_ITEM } from './constants';

const listData = (data) => ({
  type: LIST_DATA,
  payload: {
    list: data,
  },
});

export const fetchList = () => (dispatch) => {
  // TODO 💰💰💰 request remote data.
  setTimeout(() => { // fetch remote data in real world!
    const data = [{
      id: 1,
      title: '规范项目组织，流程，定义脚手架',
      status: 'doing',
    }, {
      id: 2,
      title: '埋点问题，单页埋点以及日志采集',
      status: 'doing',
    }, {
      id: 3,
      title: '国际化',
      status: 'doing',
    }];
    dispatch(listData(data));
  }, 10);
};

export const deleteItem = (id) => (dispatch) => {
  // TODO just a demo
  // http.post('url', params).then(() => {
  //   dispatch(fetchList());
  // });
  dispatch({
    type: DELETE_ITEM,
    payload: {
      id,
    },
  });
};
