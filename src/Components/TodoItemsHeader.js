import React, { Component } from 'react';
import Button from './Button';
import classNames from 'classnames';

class ListHeader extends Component {

    render(){
        const {
            onSort
        } = this.props;

        return (
            <div className="theList-header">
                <span style={{ width: '20%' }}>
                    <Button 
                    onClick={() => onSort('TITLE')}
                    className="button-inline"
                    >
                    Title
                    </Button>
                    <i className="fas fa-sort"></i>
                </span>
                <span style={{ width: '20%' }}>
                    <Sort
                    sortKey={'AUTHOR'}
                    onSort={onSort}
                    activeSortKey={'AUTHOR'}
                    >
                    Author
                    </Sort>
                    <i className="fas fa-sort"></i>
                </span>
                <span style={{ width: '20%' }}>
                    <Sort
                    sortKey={'COMMENTS'}
                    onSort={onSort}
                    activeSortKey={'COMMENTS'}
                    >
                    Comments
                    </Sort>
                    <i className="fas fa-sort"></i>
                </span>
                <span style={{ width: '20%' }}>
                    <Sort
                    sortKey={'POINTS'}
                    onSort={onSort}
                    activeSortKey={'POINTS'}
                    >
                    Points
                    </Sort>
                    <i className="fas fa-sort"></i>
                </span>
                <span style={{ width: '5%' }}>
                    Read
                </span>
                <span style={{ width: '5%' }}>
                    Remove
                </span>
            </div>
        );
    }
}

const Sort = ({ sortKey, onSort, children, activeSortKey }) => {
    const SortClass = classNames(
        'button-inline',
        { 'button-active': sortKey === activeSortKey}
    );

    return(
        <Button 
        onClick={() => onSort(sortKey)}
        className={SortClass}
        >
            {children}
        </Button>
    )
}
    

export default ListHeader;