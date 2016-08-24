import React, { PropTypes } from 'react';
import TodoItem from '../TodoItem';

const propTypes = {
  list: PropTypes.array,
  onDel: PropTypes.func,
};
const TodoList = (props) => {
  const { list = [], onDel } = props;
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {
          list.map((item) => (
            <TodoItem key={item.id} {...item} onDel={onDel} />
          ))
        }
      </ul>
    </div>
  );
};

TodoList.propTypes = propTypes;

export default TodoList;
