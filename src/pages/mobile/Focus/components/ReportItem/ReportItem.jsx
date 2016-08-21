import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import classNames from 'classnames/bind';
import util from 'core/util';
import Indicator from '../ErasableIndicator';
import * as actions from '../../flow/focusActions';
import styles from './ReportItem.scss';

const cx = classNames.bind(styles);

const propTypes = {
  chartGroupId: PropTypes.number,
  tableCnName: PropTypes.string,
  yFields: PropTypes.array,
  colorIndex: PropTypes.number,
  onDeleteIndicator: PropTypes.func,
  currentDateOptions: PropTypes.object,
  cancelFocus: PropTypes.func,
};
class ReportItem extends Component {
  constructor() {
    super();
    this.onDeleteIndicator = this.onDeleteIndicator.bind(this);
  }
  onDeleteIndicator(fieldName) {
    const { chartGroupId, cancelFocus } = this.props;
    cancelFocus(chartGroupId, fieldName);
  }
  render() {
    const { chartGroupId, tableCnName, yFields, colorIndex = 0, currentDateOptions } = this.props;
    const headerBgColor = ['#3BB1F0', '#FC8524', '#17C295'][colorIndex % 3];
    const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
    return (
      <div>
        <div className={cx('header')} style={{ backgroundColor: headerBgColor }}>
          <div className="pull-right" style={{ paddingRight: '10px' }}>
            {util.date.formatDateOptions(currentDateOptions)}
          </div>
          {tableCnName}
        </div>
        <div className={cx('indicator-list-container')}>
          <ul className={cx('indicator-list')}>
            <ReactCSSTransitionGroup
              transitionName="indicator"
              transitionEnterTimeout={500} transitionLeaveTimeout={300}
            >
            {
              _.map(yFields, (indicator) => (
                <li key={indicator.name} className={cx('item')}>
                  {
                    <Indicator
                      chartGroupId={chartGroupId} currentDateOptions={currentDateOptions}
                      {...indicator} onDelete={this.onDeleteIndicator}
                    />
                  }
                </li>
              ))
            }
            </ReactCSSTransitionGroup>
          </ul>
        </div>
      </div>
    );
  }
}
ReportItem.propTypes = propTypes;

const mapState = ({ focus }, ownProps) => {
  const chartGroup = focus.focusSet[ownProps.chartGroupId];
  return _.assign({}, chartGroup, {
    currentDateOptions: focus.currentDateOptions,
  });
};

export default connect(mapState, actions)(ReportItem);
