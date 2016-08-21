import React, { Component, PropTypes } from 'react';
import Modal from 'components/Modal';
import { Tab } from 'salt-ui';
import classNames from 'classnames/bind';
import moment from 'moment';
import DayPicker from '../DayPicker';
import MonthPicker from '../MonthPicker';
import SeasonPicker from '../SeasonPicker';
import styles from './Calendar.scss';

const cx = classNames.bind(styles);

const modeTabIndex = {
  day: 0,
  week: 1,
  month: 2,
  quarter: 3,
};
const propTypes = {
  visible: PropTypes.bool,
  mode: PropTypes.string,
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
};

class Calendar extends Component {
  constructor(props) {
    super();
    this.state = {
      startDate: moment(props.startDate),
      endDate: moment(props.endDate),
    };
    this.onSelect = this.onSelect.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onOk = this.onOk.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
  }
  onClear() {
    this.setState({
      startDate: null,
      endDate: null,
    });
  }
  onTabChange(obj) {
    this.setState({
      mode: ['day', 'week', 'month', 'quarter'][obj.active],
    });
  }
  onOk() {
    const { mode, startDate, endDate } = this.state;
    this.props.onOk({
      mode,
      startDate,
      endDate,
    });
  }
  onSelect({ startDate, endDate }) {
    this.setState({
      startDate,
      endDate,
    });
  }
  render() {
    const { visible, onCancel } = this.props;
    const { mode, startDate, endDate } = this.state;
    const activeTab = modeTabIndex[mode];
    return (
      <Modal
        title="请选择日期" visible={visible} closeBtn="清除"
        onClose={this.onClear}
        onCancel={onCancel}
        onOk={this.onOk}
      >
        <div className={cx('calendar', 'row')}>
          <Tab active={activeTab} onChange={this.onTabChange}>
            <Tab.Item key="day" title="日历">
              <DayPicker
                mode="day"
                startDate={startDate}
                endDate={endDate}
                onSelect={this.onSelect}
              />
            </Tab.Item>
            <Tab.Item key="week" title="周历">
              <DayPicker
                mode="week"
                startDate={startDate}
                endDate={endDate}
                onSelect={this.onSelect}
              />
            </Tab.Item>
            <Tab.Item key="month" title="月历">
              <MonthPicker date={startDate} onSelect={this.onSelect} />
            </Tab.Item>
            <Tab.Item key="quarter" title="季度">
              <SeasonPicker date={startDate} onSelect={this.onSelect} />
            </Tab.Item>
          </Tab>
        </div>
      </Modal>
    );
  }
}

Calendar.propTypes = propTypes;

export default Calendar;
