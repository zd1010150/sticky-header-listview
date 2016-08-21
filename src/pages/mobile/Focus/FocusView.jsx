import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import classNames from 'classnames/bind';
import Loading from 'components/Loading';
import ddHelper from 'core/ddHelper';
import * as actions from './flow/focusActions';
import ReportItem from './components/ReportItem';
import FilterLayer from './components/FilterLayer';
import styles from './FocusView.scss';
import Guide from './components/Guide';

const cx = classNames.bind(styles);

const propTypes = {
  fetchFocus: PropTypes.func,
  focusSet: PropTypes.object,
  isShowFilter: PropTypes.bool,
  setMenu: PropTypes.func,
  showLoading: PropTypes.bool,
  guide: PropTypes.object,
  isShowGuide: PropTypes.func,
};

const defaultProps = {
  guide: {
    show: false,
    targetSize: 0,
  },
};

class Focus extends Component {
  componentDidMount() {
    this.props.fetchFocus();
    ddHelper.setTitle('智能报表');
    this.props.setMenu();
    this.props.isShowGuide();
  }
  render() {
    const { focusSet, isShowFilter, showLoading, guide } = this.props;
    let tip = null;
    if (focusSet && _.isEmpty(focusSet)) {
      const imgUrl = 'https://gw.alicdn.com/tps/TB15yB0LpXXXXbZXXXXXXXXXXXX-750-1334.jpg';
      tip = (<img className={cx('guide-tip')} src={imgUrl} alt="提示" />);
    }
    let cIndex = 0;
    return (
      <div data-spm="2040561">
        <Loading show={showLoading} />
        <Guide show={guide.show} targetSize={guide.targetSize} />
        <div className={cx({ 'blur-mask': true, active: isShowFilter })}>
          <ul className={cx('focus-list')}>
            {
              _.map(_.sortBy(focusSet, ['order']), (table) => (
                <li key={table.chartGroupId}>
                  <ReportItem chartGroupId={+table.chartGroupId} colorIndex={cIndex++} />
                </li>
              ))
            }
          </ul>
          { tip }
        </div>
        <FilterLayer visible={isShowFilter} />
      </div>
    );
  }
}
Focus.propTypes = propTypes;
Focus.defaultProps = defaultProps;

const mapState = ({ focus }) => (focus);

export default connect(mapState, actions)(Focus);
