import React, { Component, PropTypes } from 'react';

const propTypes = {
  className: PropTypes.string,
  quarter: PropTypes.number,
  onClick: PropTypes.func,
};
const defaultProps = {
  quarter: 0,
  onClick() {},
};
class QuarterBtn extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.onClick(this.props.quarter);
  }
  render() {
    const { quarter, className } = this.props;
    return (
      <div className={className} onClick={this.handleClick}>{`${quarter + 1}季度`}</div>
    );
  }
}

QuarterBtn.propTypes = propTypes;
QuarterBtn.defaultProps = defaultProps;

export default QuarterBtn;
