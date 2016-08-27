import http from 'core/http';
import {
  HTTP_ACTION_DONE,
  HTTP_ACTION_DOING,
  HTTP_ACTION_ERROR,
} from './constants.js';

const dispatch = (request, dispatcher = () => {}) => {
  dispatcher({
    type: HTTP_ACTION_DOING,
    payload: {},
  });
  return request.then((data) => {
    dispatcher({
      type: HTTP_ACTION_DONE,
      payload: {
        data,
      },
    });
    return data;
  }).catch((err) => {
    console.error(err);
    dispatcher({
      type: HTTP_ACTION_ERROR,
      payload: {
        err,
      },
    });
    return Promise.reject(err);
  });
};

export const post = (url, data = {}, realHeaders = {}, dispatcher) =>
  (dispatch(http.post(url, data, realHeaders), dispatcher));

export const get = (url, data, dispatcher) =>
  (dispatch(http.get(url, data), dispatcher));
