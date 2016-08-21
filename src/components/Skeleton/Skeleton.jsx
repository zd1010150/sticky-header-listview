/**
 *  页面结构文件：维护全局 DOM 结构
 */

import React, { PropTypes } from 'react';

const Skeleton = ({ children }) => (
  <div className="container">
    <div className="main-container">{children}</div>
  </div>
);
Skeleton.propTypes = {
  children: PropTypes.element.isRequired,
};
export default Skeleton;
