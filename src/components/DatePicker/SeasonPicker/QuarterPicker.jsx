import React, { Component, PropTypes } from 'react';
import Spinner from 'components/Spinner/Spinner.jsx';
import moment from 'moment';
import classNames from 'classnames/bind';
import QuarterBtn from './QuarterBtn.jsx';
import styles from './QuarterPicker.scss';

const cx = classNames.bind(styles);

const propTypes = {
  onSelect: PropTypes.func,
  date: PropTypes.object,
};
const defaultProps = {
  onSelect() {},
};
class QuarterPicker extends Component {
  constructor(props) {
    super();
    const currentYear = moment(props.date).year();
    const quarter = moment(props.date).quarter();
    this.state = {
      currentYear,
      quarter,
    };
    this.selectSeason = this.selectSeason.bind(this);
    this.onYearChange = this.onYearChange.bind(this);
  }
  onYearChange(currentYear) {
    this.setState({ currentYear });
  }
  selectSeason(quarter) {
    this.setState({ quarter });
    const currentYear = this.state.currentYear;
    this.props.onSelect({
      startDate: moment().year(currentYear).quarter(quarter).startOf('quarter'),
      endDate: moment().year(currentYear).quarter(quarter).endOf('quarter'),
    });
  }
  renderSeasonPanel() {
    const quarterCells = [];
    for (let i = 0; i < 4; i++) {
      const btnClass = cx({
        'quarter-btn': true,
        selected: i === this.state.quarter,
      });
      const quarterCell = (
        <div className={cx('quarter-item')} key={i}>
          <QuarterBtn className={btnClass} quarter={i} onClick={this.selectSeason} />
        </div>
      );
      quarterCells.push(quarterCell);
    }
    return (
      <div className={cx('quarter-panel', 'clearfix')}>
        {quarterCells}
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
        {this.renderSeasonPanel()}
      </div>
    );
  }
}

QuarterPicker.propTypes = propTypes;
QuarterPicker.defaultProps = defaultProps;

export default QuarterPicker;
