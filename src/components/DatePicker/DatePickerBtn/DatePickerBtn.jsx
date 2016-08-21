import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import classNames from 'classnames/bind';
import styles from './DatePickerBtn.scss';
const cx = classNames.bind(styles);

const propTypes = {
  className: PropTypes.string,
  mode: PropTypes.oneOf(['day', 'week', 'month']),
  value: PropTypes.number,
  text: PropTypes.string,
  onSelect: PropTypes.func,
  active: PropTypes.bool,
};
const defaultProps = {
  mode: 'day',
  value: 0,
};
class DatePickerBtn extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    const { value, mode, onSelect } = this.props;
    let startDate;
    let endDate;
    const oneDay = moment().add(value, mode);
    if (mode === 'day') {
      startDate = endDate = oneDay;
    } else if (mode === 'week') {
      startDate = oneDay.weekday(0);
      endDate = oneDay.weekday(6);
    } else if (mode === 'month') {
      startDate = endDate = oneDay;
    }
    onSelect({
      mode,
      startDate,
      endDate,
    });
  }
  render() {
    const { className, text, active } = this.props;
    const btnClass = cx({
      [className]: className,
      btn: true,
      active,
    });

    return (
      <div className={btnClass} onClick={this.handleClick}>
        {text}
      </div>
    );
  }
}
DatePickerBtn.propTypes = propTypes;
DatePickerBtn.defaultProps = defaultProps;

export default DatePickerBtn;
