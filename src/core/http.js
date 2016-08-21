import fetch from 'isomorphic-fetch';
import _ from 'lodash';

const request = (url, init, headers) => {
  const options = _.assign({
    credentials: 'include',
  }, init);
  options.headers = Object.assign(options.headers || {}, headers || {});
  return fetch(url, options)
    .then((res) => res.json())
    .then((resObj) => {
      if (resObj.errCode !== 0) {
        console.warn(resObj);
        throw new Error('服务请求出错！');
      }
      return resObj.data;
    });
};

const get = (url, data) => {
  let realUrl = url;
  if (_.isObject(data)) {
    const paramsStr = _.map(data, (value, key) => (
      `${key}=${encodeURIComponent(value)}`)
    ).join('&');
    const connector = url.indexOf('?') === -1 ? '?' : '&';
    realUrl = url + connector + paramsStr;
  }
  return request(realUrl);
};

let csrfToken;
const fetchCsrfTokenPromise = () => {
  if (!csrfToken) {
    csrfToken = request('/alid/sst/csrf/getCsrfToken', {}).then((info) => {
      if (!info || !info.headerName || !info.token) {
        dd.device.notification.alert({
          title: '提示',
          message: '获取CSRF token 失败！',
        });
        throw new Error('CSRF Not Exist!');
      }
      return info || {};
    });
  }
  return csrfToken;
};

const post = (url, data = {}, realHeaders = {}) => (fetchCsrfTokenPromise().then((info) => {
  const headers = {
    Accept: 'application/json',
    [info.headerName]: info.token,
    'Content-Type': realHeaders['Content-Type'] || 'application/x-www-form-urlencoded',
  };
  let formBody = data;
  if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
    const arr = _.map(data, (value, property) => {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(value);
      return `${encodedKey}=${encodedValue}`;
    });
    formBody = arr.join('&');
  } else if (headers['Content-Type'] === 'application/json') {
    formBody = JSON.stringify(data);
  }
  return request(url, {
    method: 'POST',
    headers,
    body: formBody,
  });
}));

export default {
  request,
  get,
  post,
};
