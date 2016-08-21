import http from './http';
import util from './util';

const auth = () => {
  const urlParams = util.url.parse(location.search);
  const corpId = urlParams.corpId;
  const promise = new Promise((resolve, reject) => {
    dd.runtime.permission.requestAuthCode({
      corpId,
      onSuccess: (authResult) => {
        http.get(`/alid/ding/jsauth?corpid=${corpId}&code=${authResult.code}&version=${dd.version}`)
        .then(() => {
          resolve();
        }).catch((err) => {
          reject(err);
        });
      },
      onFail: (error) => {
        reject(error);
      },
    });
  });
  return promise;
};

const setTitle = (title) => {
  dd.biz.navigation.setTitle({ title });
  document.title = title;
};

export default {
  auth,
  setTitle,
};
