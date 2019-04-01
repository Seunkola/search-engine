import React, { Component } from 'react'
import Button from './Button';
import { SORTS } from '../Constants/Constants';
import ListHeader from './TodoItemsHeader';

const largeColumn = {
  width: '20%',
};

const midColumn = {
  width: '5%',
};
  
class TodoItems extends Component {
  render() {
    const {
      sortKey,
      onSort,
      isSortReverse,
    } = this.props;

    const todoEntries = this.props.entries;
    const sortedList = SORTS[sortKey](todoEntries);
    const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;

    return (
      <div className="theList">
        <ListHeader onSort={onSort} />
        {reverseSortedList.map(item =>
          <div key={item.objectID} className="theList-row">
            <span style={largeColumn}>
              {item.title}
            </span>
            <span style={largeColumn}>
              {item.author}
            </span>
            <span style={largeColumn}>
              {item.num_comments}
            </span>
            <span style={largeColumn}>
              {item.points}
            </span>
            <span style={midColumn}>
              <a href={item.url}>View</a>
            </span>
            <span style={midColumn}>
              <Button
                className="button-inline"
                onClick={() => this.props.onDismiss(item.objectID)}
                >
              </Button>
            </span>
          </div>
        )}
      </div>
      );
  }
}

export default TodoItems;