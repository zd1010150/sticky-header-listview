import React, { Component, PropTypes } from 'react';

const propTypes = {
  className: PropTypes.string,
  month: PropTypes.number,
  onClick: PropTypes.func,
};
const defaultProps = {
  month: 0,
  onClick() {},
};
class MonthBtn extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.onClick(this.props.month);
  }
  render() {
    const { month, className } = this.props;
    return (
      <div className={className} onClick={this.handleClick}>{`${month + 1}月`}</div>
    );
  }
}

MonthBtn.propTypes = propTypes;
MonthBtn.defaultProps = defaultProps;

export default MonthBtn;
