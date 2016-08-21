import _ from 'lodash';
import moment from 'moment';

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
  date: {
    getDefaultDate() {
      if (moment().hour() >= 18) {
        return moment().format('YYYY-MM-DD');
      }
      return moment().add(-1, 'day').format('YYYY-MM-DD');
    },
    localizeToZh(date) {
      const tDate = moment(new Date(date));
      const cDate = moment(new Date());
      const duration = cDate.diff(tDate, 'days');
      const durationY = cDate.diff(tDate, 'years');
      if (duration === 0) {
        return '今日';
      } else if (duration === 1) {
        return '昨日';
      } else if (durationY === 0) {
        return tDate.format('MM-DD');
      }
      return tDate.format('YYYY-MM-DD');
    },
    formatDateOptions(currentDateOptions = {}) {
      const mode = currentDateOptions.mode;
      const startDate = moment(currentDateOptions.startDate);
      const endDate = moment(currentDateOptions.endDate);
      const now = moment();
      if (mode === 'day') {
        const lastday = moment().add(-1, 'day');
        if (endDate.isSame(now, 'day')) {
          return '今日';
        } else if (endDate.isSame(lastday, 'day')) {
          return '昨日';
        }
        return endDate.format('YYYY-MM-DD');
      } else if (mode === 'week') {
        const lastweek = moment().add(-1, 'week');
        if (startDate.isSame(now, 'week') &&
          endDate.isSame(now, 'week')) {
          return '本周';
        } else if (startDate.isSame(lastweek, 'week') &&
          endDate.isSame(lastweek, 'week')) {
          return '上周';
        }
      } else if (mode === 'month') {
        const lastMonth = moment().add(-1, 'month');
        if (startDate.isSame(now, 'month') &&
          endDate.isSame(now, 'month')) {
          return '本月';
        } else if (startDate.isSame(lastMonth, 'month') &&
          endDate.isSame(lastMonth, 'month')) {
          return '上月';
        }
      }
      const startDateStr = startDate.format('YYYY-MM-DD');
      const endDateStr = endDate.format('YYYY-MM-DD');
      return `${startDateStr}~${endDateStr}`;
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
