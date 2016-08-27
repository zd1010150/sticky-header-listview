import React from 'react';
import Spinner from 'components/Spinner';

const WidgetsView = () => (
  <div>
    <h3>组件页</h3>
    <ul>
      <li>
        <Spinner number={2016} text="2016年" />
      </li>
    </ul>
  </div>
);

export default WidgetsView;
