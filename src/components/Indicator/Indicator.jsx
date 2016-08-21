import React, { PropTypes } from 'react';
import _ from 'lodash';
import util from 'core/util';
import classNames from 'classnames/bind';
import styles from './Indicator.scss';

const cx = classNames.bind(styles);

const propTypes = {
  cnName: PropTypes.string,
  value: PropTypes.number,
  contrast: PropTypes.object,
  className: PropTypes.string,
};
const Indicator = (props) => {
  const { cnName, value, contrast, className } = props;
  let contrastBlock = (<div className={cx('contrast')} />);
  if (!_.isNil(contrast)) {
    const contrastClasses = cx({
      'contrast-value': true,
      increase: contrast.value > 0,
      decrease: contrast.value < 0,
    });
    contrastBlock = (
      <div className={cx('contrast')}>
        <div className={cx('contrast-name')}>{contrast.name}</div>
        <div className={contrastClasses}>{util.number.toPercent(contrast.value)}</div>
      </div>
    );
  }
  const classes = classNames(cx('indicator'), {
    [className]: className,
  });
  let number = util.number.localize(value);
  if (number === '--') {
    number = <span className={cx('empty')}>暂无数据</span>;
  } else {
    number = <span>{number}</span>;
  }

  return (
    <div className={classes}>
      <div className="clearfix">
        <div className={cx('title')}>{cnName}</div>
        <div className={cx('value')}>{number}</div>
        {contrastBlock}
        <div className={cx('arrow')}>
          <i className="bi-icon bi-icon-right" />
        </div>
      </div>
    </div>
  );
};
Indicator.propTypes = propTypes;

export default Indicator;
