import _ from 'lodash';

const util = {
  number: {
    localize(num, precision = 2) {
      if (!_.isFinite(num)) {
        return '--';
      }
      const flag = num < 0 ? '-' : '';
      const number = Math.abs(num);
      if (number > 100000000) {
        return `${flag}${(number / 100000000).toFixed(precision)}亿`;
      } else if (number > 10000) {
        return `${flag}${(number / 10000).toFixed(precision)}万`;
      }
      return num;
    },
    comma(number) {
      if (_.isNil(number)) {
        return '--';
      }
      const nStr = `${number}`;
      const x = nStr.split('.');
      let x1 = x[0];
      const x2 = x.length > 1 ? `.${x[1]}` : '';
      const rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1,$2');
      }
      return x1 + x2;
    },
    toPercent(value, precision = 2) {
      if (_.isNumber(value) && _.isFinite(value)) {
        const percentValue = (Math.abs(value) * 100).toFixed(precision);
        return `${percentValue}%`;
      }
      return '--';
    },
  },
  url: {
    parse(realurl) {
      const url = realurl.replace('#', '');
      const arr = url.split('?');
      if (arr.length === 1) {
        return {};
      }
      const kvStr = arr[1];
      const kv = kvStr.split('&');
      return kv.reduce((params, item) => {
        const kvArr = item.split('=');
        const newParams = params;
        if (kvArr.length === 2) {
          newParams[kvArr[0]] = kvArr[1];
        }
        return newParams;
      }, {});
    },
  },
};
export default util;
