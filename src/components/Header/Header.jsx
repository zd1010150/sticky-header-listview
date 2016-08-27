import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames/bind';
import styles from './Header.scss';

const cx = classnames.bind(styles);

const Header = () => (
  <div className={cx('header')}>
    <div className="container">
      <Link to="/">Demo</Link>
      <Link to="/widgets" style={{ marginLeft: '20px' }}>自定义Widgets</Link>
    </div>
  </div>
);

export default Header;
