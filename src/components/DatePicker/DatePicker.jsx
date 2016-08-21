import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import classNames from 'classnames/bind';
import styles from './DatePicker.scss';
import DatePickerBtn from './DatePickerBtn';
import Calendar from './Calendar';

const cx = classNames.bind(styles);

const propTypes = {
  mode: PropTypes.string,
  startDate: PropTypes.string, // 组件接收和外传的都是统一字符串形式，内部都是moment对象
  endDate: PropTypes.string,
  onChange: PropTypes.func,
};
const defaultProps = {
  mode: 'day',
  onChange() {},
};

const btns = [{
  mode: 'day',
  diffValue: 0,
  text: '今日',
}, {
  mode: 'day',
  diffValue: -1,
  text: '昨日',
}, {
  mode: 'week',
  diffValue: 0,
  text: '本周',
}, {
  mode: 'week',
  diffValue: -1,
  text: '上周',
}, {
  mode: 'month',
  diffValue: 0,
  text: '本月',
}, {
  mode: 'month',
  diffValue: -1,
  text: '上月',
}];

class DatePicker extends Component {
  constructor() {
    super();
    this.state = {
      isShowCalendar: false,
    };
    this.onSelect = this.onSelect.bind(this);
    this.openCalendar = this.openCalendar.bind(this);
  }
  onSelect({ mode, startDate, endDate }) {
    this.props.onChange({
      mode,
      startDate: moment(startDate).format('YYYY-MM-LL'),
      endDate: moment(endDate).format('YYYY-MM-LL'),
    });
  }
  openCalendar() {
    this.setState({
      isShowCalendar: true,
    });
  }
  render() {
    let { mode, startDate, endDate } = this.props;
    const { isShowCalendar } = this.state;
    startDate = moment(startDate);
    endDate = moment(endDate);
    if (startDate.isBefore(endDate)) {
      [startDate, endDate] = [endDate, startDate];
    }
    let hasActive = false;
    const quickBtns = btns.map(({ mode: tMode, diffValue, text }, index) => {
      let isInRange = false;
      const oneDay = moment().add(diffValue, mode);
      if (tMode === mode &&
        oneDay.isSame(endDate, mode) &&
        oneDay.isSame(startDate, mode)) {
        hasActive = isInRange = true;
      }
      return (
        <div key={index} className="col-xs-4">
          <DatePickerBtn
            mode={mode} value={diffValue} active={isInRange}
            text={text} onSelect={this.onSelect}
          />
        </div>
      );
    });
    const customeClass = cx({
      btn: true,
      active: !hasActive,
    });
    return (
      <div>
        <div className={cx('date-picker', 'row')}>
          { quickBtns }
          <div className="col-xs-12">
            <div className={customeClass} onClick={this.openCalendar}>
              { hasActive ? '自定义日期' : '' }
            </div>
          </div>
        </div>
        <Calendar mode={mode} startDate={startDate} endDate={endDate} visible={isShowCalendar} />
      </div>
    );
  }
}

DatePicker.propTypes = propTypes;
DatePicker.defaultProps = defaultProps;

export default DatePicker;
