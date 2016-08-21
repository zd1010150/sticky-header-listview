import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import Spinner from 'components/Spinner/Spinner.jsx';
import classNames from 'classnames/bind';
import styles from './DayPicker.scss';
import DayBtn from './DayBtn.jsx';

const cx = classNames.bind(styles);

const isHoliday = (date) => (
  date.weekday() === 5 || date.weekday() === 6
);
const isSameDay = (first, second) => (
  first && second && first.isSame(second, 'day')
);
const isInRange = (current, startDate, endDate) => {
  if (startDate && endDate && current) {
    return !(current.isAfter(endDate, 'day') || current.isBefore(startDate, 'day'));
  }
  return false;
};

const propTypes = {
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  mode: PropTypes.string,
  onSelect: PropTypes.func,
};
const defaultProps = {
  mode: 'day',
  onSelect() {},
};
class DayPicker extends Component {
  constructor(props) {
    super();
    let { mode, startDate, endDate } = props;
    const currentYear = moment(startDate).year();
    const currentMonth = moment(startDate).month();
    if (mode === 'week' && startDate) {
      startDate = startDate.clone().weekday(0);
      endDate = startDate.clone().weekday(6);
    }
    this.state = {
      startDate,
      endDate,
      currentYear,
      currentMonth,
      isSelecting: false,
    };
    this.onYearChange = this.onYearChange.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);
    this.selectDate = this.selectDate.bind(this);
  }
  onYearChange(currentYear) {
    this.setState({ currentYear });
  }
  onMonthChange(month) {
    let currentYear = this.state.currentYear;
    if (month >= 12) {
      currentYear += 1;
    }
    if (month < 0) {
      currentYear -= 1;
    }
    let currentMonth = month;
    currentMonth = (currentMonth + 12) % 12;
    this.setState({ currentYear, currentMonth });
  }
  selectDate(selectedDate) {
    const { mode } = this.props;
    let { isSelecting, startDate, endDate } = this.state;
    if (mode === 'week') {
      startDate = selectedDate.clone().weekday(0);
      endDate = selectedDate.clone().weekday(6);
    } else if (mode === 'day') {
      if (isSelecting) {
        if (selectedDate.isSame(this.state.startDate, 'day')) { // cancel select
          startDate = endDate = null;
        } else {
          endDate = selectedDate;
          if (startDate.isAfter(endDate)) {
            [startDate, endDate] = [endDate, startDate];
          }
        }
      } else {
        endDate = startDate = selectedDate;
      }
      isSelecting = !isSelecting;
    }
    this.setState({
      startDate,
      endDate,
      isSelecting,
    });
    this.props.onSelect({
      startDate,
      endDate,
    });
  }
  render() {
    const { startDate, endDate, currentYear, currentMonth } = this.state;
    const monthText = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'][currentMonth];
    const firstMonday = moment().year(currentYear).month(currentMonth).date(1).weekday(0);
    let current = firstMonday.clone();
    const dateCells = [];
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        current = firstMonday.clone();
        current.add((i * 7) + j, 'day');
        const isInCurrentMonth = currentMonth === current.month();
        const classes = cx({
          'day-item': true,
          'other-month': !isInCurrentMonth,
          'happy-day': isHoliday(current),
        });

        const selected = isInRange(current, startDate, endDate);
        let actionText = '';
        if (isSameDay(endDate, current)) {
          actionText = '结束';
        }
        if (isSameDay(startDate, current)) {
          actionText = '开始';
        }
        dateCells.push(
          <div key={current.format('YYYY-MM-LL')} className={classes}>
            <DayBtn
              className={cx({ selected })}
              actionText={actionText}
              date={current}
              onClick={this.selectDate}
            />
          </div>
        );
      }
    }
    return (
      <div>
        <div className="row">
          <div className="col-xs-6">
            <Spinner number={currentYear} text={`${currentYear}年`} onChange={this.onYearChange} />
          </div>
          <div className="col-xs-6">
            <Spinner number={currentMonth} text={`${monthText}月`} onChange={this.onMonthChange} />
          </div>
        </div>
        <div className={cx('bar', 'clearfix')}>
          {
            ['一', '二', '三', '四', '五', '六', '日'].map((text, index) => {
              const weekItemClasses = cx({
                'bar-item': true,
                'happy-day': index >= 5,
              });
              return (<span className={weekItemClasses} key={text}>{text}</span>);
            })
          }
        </div>
        <div className={cx('day-panel', 'clearfix')}>
          {dateCells}
        </div>
      </div>
    );
  }
}

DayPicker.propTypes = propTypes;
DayPicker.defaultProps = defaultProps;

export default DayPicker;
