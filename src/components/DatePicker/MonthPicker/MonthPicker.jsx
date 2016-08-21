import React, { Component, PropTypes } from 'react';
import Spinner from 'components/Spinner/Spinner.jsx';
import classNames from 'classnames/bind';
import moment from 'moment';
import MonthBtn from './MonthBtn.jsx';
import styles from './MonthPicker.scss';

const cx = classNames.bind(styles);

const propTypes = {
  onSelect: PropTypes.func,
  date: PropTypes.object,
};
const defaultProps = {
  onSelect() {},
};
class MonthPicker extends Component {
  constructor(props) {
    super();
    const currentYear = moment(props.date).year();
    const month = moment(props.date).month();
    this.state = {
      currentYear,
      month,
    };
    this.selectMonth = this.selectMonth.bind(this);
    this.onYearChange = this.onYearChange.bind(this);
  }
  onYearChange(currentYear) {
    this.setState({ currentYear });
  }
  selectMonth(month) {
    const currentYear = this.state.currentYear;
    this.setState({ month });
    this.props.onSelect({
      startDate: moment().year(currentYear).month(month).startOf('month'),
      endDate: moment().year(currentYear).month(month).endOf('month'),
    });
  }
  renderMonthPanel() {
    const monthCells = [];
    for (let i = 0; i < 12; i++) {
      const btnClass = cx({
        'month-btn': true,
        selected: i === this.state.month,
      });
      const monthCell = (
        <div className={cx('month-item')} key={i}>
          <MonthBtn className={btnClass} month={i} onClick={this.selectMonth} />
        </div>
      );
      monthCells.push(monthCell);
    }
    return (
      <div className={cx('month-panel', 'clearfix')}>
        {monthCells}
      </div>
    );
  }
  render() {
    const { currentYear } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-xs-6 col-xs-offset-3">
            <Spinner number={currentYear} text={`${currentYear}年`} onChange={this.onYearChange} />
          </div>
        </div>
        {this.renderMonthPanel()}
      </div>
    );
  }
}

MonthPicker.propTypes = propTypes;
MonthPicker.defaultProps = defaultProps;
export default MonthPicker;
