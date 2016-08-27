import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from './flow/homeActions';
import TodoList from './components/TodoList';

/*
  HomeView 只是一个 container， 负责 fetch data, connect state，交互细节交给子级组件
 */
const propTypes = {
  fetchList: PropTypes.func,
  list: PropTypes.array,
  deleteItem: PropTypes.func,
};
class HomeView extends Component {

  componentDidMount() {
    // TODO 💰💰💰 fetch datalist
    this.props.fetchList();
  }
  render() {
    const { list, deleteItem } = this.props;
    return (
      <div>
        <TodoList list={list} onDel={deleteItem} />
      </div>
    );
  }
}

HomeView.propTypes = propTypes;

const mapState = ({ home }) => (home);

export default connect(mapState, actions)(HomeView);
