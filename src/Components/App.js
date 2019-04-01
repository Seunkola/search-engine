import React, { Component } from 'react';
import '../Styles/App.css';
import TodoItems  from './TodoItems';
import Header from './TodoList';
import { DEFAULT_QUERY, PATH_BASE, PATH_SEARCH, PARAM_SEARCH, PARAM_PAGE, PARAM_HPP, DEFAULT_HPP,
} from '../Constants/Constants';
import Button from './Button';
import ErrorDisplay from './ErrorDisplay';
import axios from 'axios';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { updateSearchTopStoriesState } from './Function/updateStories';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false,
      sortKey: 'NONE',
      isSortReverse: false,
    };

    this.needToSearchTopStories = this.needToSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSort = this.onSort.bind(this);
  }
  
  needToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  setSearchTopStories(result) {
    const { hits, page } = result;
    this.setState(updateSearchTopStoriesState(hits,page));
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    this.setState({ isLoading: true });

    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(result => this.setSearchTopStories(result.data))
      .catch(error => 
        this.setState({ error })
      );
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    if(this.needToSearchTopStories(searchTerm)){
      this.fetchSearchTopStories(searchTerm);
    }
    
    event.preventDefault();
  }

  onSort(sortKey) {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({ sortKey, isSortReverse });
  }

  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);
    this.setState({ 
      results: { 
        ...results, 
        [searchKey]: {hits: updatedHits, page}
       }
     });
  }

  render(){
    const { searchTerm, results, searchKey, error, isLoading, sortKey, isSortReverse } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0;    
    const list = (results && results[searchKey] && results[searchKey].hits) || [];

    return (
      <div className="App">
        <Header 
          onSearchChange={this.onSearchChange} 
          searchTodo={searchTerm}
          onSearchSubmit={this.onSearchSubmit} />

        <ErrorDisplay error={error} />

        <TodoItems 
        entries={list}
        sortKey={sortKey}
        onSort={this.onSort} 
        onDismiss={this.onDismiss}
        isSortReverse={isSortReverse} 
        />

        <div className="interactions">
        {
          isLoading 
          ?
          <Loading />
          :
          <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
            Load More...
          </Button>
        }
        </div>
      </div>
    );
  }
}

Button.PropTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

TodoItems.PropTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      title: PropTypes.string,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number,
    })
  )
  .isRequired,
  onDismiss: PropTypes.func.isRequired,
}

Header.PropTypes = {
  searchTodo: PropTypes.string.isRequired,
  onSearchSubmit: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func,
}

export default App;