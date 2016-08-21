import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import classNames from 'classnames/bind';
import Modal from 'components/Modal';
import DatePicker from 'components/DatePicker';
import * as actions from '../../flow/focusActions';
import styles from './FilterLayer.scss';

const cx = classNames.bind(styles);

const propTypes = {
  visible: PropTypes.bool,
  hideFilter: PropTypes.func,
  currentDateOptions: PropTypes.object,
  changeFilter: PropTypes.func,
};
const defaultProps = {
  visible: false,
  hideFilter() {},
  changeFilter() {},
};
class FilterLayer extends Component {
  constructor() {
    super();
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(newDateOptions) {
    this.props.changeFilter({
      currentDateOptions: _.clone(newDateOptions),
    });
    this.props.hideFilter();
  }
  render() {
    const { visible, currentDateOptions, hideFilter } = this.props;
    return (
      <Modal
        visible={visible} title="筛选"
        onCancel={hideFilter} onClose={hideFilter} onOK={hideFilter}
      >
        <ul className={cx('filter-list')}>
          <li>
            <div className={cx('filter-name')}><span>日期</span></div>
            <DatePicker {...currentDateOptions} onChange={this.handleDateChange} />
          </li>
        </ul>
      </Modal>
    );
  }
}

FilterLayer.propTypes = propTypes;
FilterLayer.defaultProps = defaultProps;

const mapState = ({ focus }) => (focus);

export default connect(mapState, actions)(FilterLayer);
