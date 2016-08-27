import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from './Spinner.scss';
const cx = classNames.bind(styles);

const propTypes = {
  number: PropTypes.number,
  text: PropTypes.string,
  onChange: PropTypes.func,
};
const defaultProps = {
  onChange() {},
};
class Spinner extends Component {
  constructor() {
    super();
    this.onInc = this.onInc.bind(this);
    this.onDec = this.onDec.bind(this);
  }
  onInc() {
    const { number, onChange } = this.props;
    onChange(number + 1);
  }
  onDec() {
    const { number, onChange } = this.props;
    onChange(number - 1);
  }
  render() {
    const { text } = this.props;
    return (
      <div className={cx('spinner')}>
        <i className="bi-icon bi-icon-left" onClick={this.onDec} />
        <span>{text}</span>
        <i className="bi-icon bi-icon-right" onClick={this.onInc} />
      </div>
    );
  }
}

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;

export default Spinner;
