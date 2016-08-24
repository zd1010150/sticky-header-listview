import React, { Component, PropTypes } from 'react';
import classnames from 'classnames/bind';
import styles from './TodoItem.scss';

const cx = classnames.bind(styles);

const propTypes = {
  title: PropTypes.string,
  id: PropTypes.number,
  onDel: PropTypes.func,
};
const defaultProps = {
  onDel() {},
};

class TodoItem extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onDel(this.props.id);
  }

  render() {
    const { title } = this.props;
    return (
      <div className={cx('item')}>
        <span>{title}</span>
        <span className={cx('del-btn')} onClick={this.handleClick}>删除</span>
      </div>
    );
  }
}

TodoItem.propTypes = propTypes;
TodoItem.defaultProps = defaultProps;

export default TodoItem;
