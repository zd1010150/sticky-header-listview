import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import classNames from 'classnames/bind';
import styles from './DayBtn.scss';

const cx = classNames.bind(styles);

const propTypes = {
  onClick: PropTypes.func,
  date: PropTypes.object,
  className: PropTypes.string,
  dateText: PropTypes.string,
  actionText: PropTypes.string,
};
const defaultProps = {
  date: moment(),
  onClick() {},
};
class DayBtn extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.onClick(this.props.date);
  }
  render() {
    const { className, date, dateText, actionText } = this.props;
    const classes = classNames(cx('day-btn'), className);
    return (
      <div className={classes} onClick={this.handleClick}>
        <div className={cx('date-text')}>{dateText}</div>
        <div className={cx('date')}>{date.date()}</div>
        <div className={cx('action-text')}>{actionText}</div>
      </div>
    );
  }
}

DayBtn.propTypes = propTypes;
DayBtn.defaultProps = defaultProps;

export default DayBtn;
