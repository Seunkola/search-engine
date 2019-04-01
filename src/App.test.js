import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './Components/App';
import Header from './Components/TodoList';
import Button from './Components/Button';
import TodoItems from './Components/TodoItems';
import { updateSearchTopStoriesState } from './Components/Function/updateStories';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create( <App /> );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});

describe('Header with search', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Header />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create( <Header /> );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});

describe('Button', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button  onClick={() => 'test'}>Test</Button>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create( <Button onClick={() => 'test'}>Test</Button> );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});

describe('Display List of Items', () => {
  const props = {
    list: [
      { title: '1', objectID: '1'},
      { title: '2', objectID: '2'},
    ],
    sortKey: 'TITLE',
    isSortReverse: false,
  };

  it('renders without crashing', () => {
    const div =  document.createElement('div');
    ReactDOM.render(<TodoItems 
      entries={props.list}
        sortKey={props.sortKey}
        isSortReverse={props.isSortReverse} />, div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create( 
    <TodoItems  
      entries={props.list}
      sortKey={props.sortKey}
      isSortReverse={props.isSortReverse} 
      /> );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shows two items in the List', () => {
    const element = shallow( 
    <TodoItems 
    entries={props.list}
    sortKey={props.sortKey}
    isSortReverse={props.isSortReverse}
     /> );
    expect(element.find('.theList-row').length).toBe(2);
  });

});

describe('updates searched stories', () => {
  it('returns a new state', () => {

    const results = {
      hits: [
        { title: '1', objectID: '1'},
        { title: '2', objectID: '2'},
      ],
      page: 1,
    }

    const { hits, page } = results;

    const wrapper = shallow(<App />);

    wrapper.setState(updateSearchTopStoriesState(hits, page));

    const expectedStateResults = {
        "redux": {
            "hits": [
              { title: '1', objectID: '1'},
              { title: '2', objectID: '2'},
            ],
          "page": 1
        },
    };

    expect(wrapper.state('results')).toEqual(expectedStateResults);
  
  });
});

