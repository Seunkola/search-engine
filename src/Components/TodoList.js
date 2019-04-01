import React, {Component} from 'react'

class Header extends Component {
    componentDidMount() {
        if(this.input){
            this.input.focus();
        }
    }
    
    render() {
        const {
            onSearchSubmit,
            searchTodo,
            onSearchChange
        } = this.props;
        return(
            <div className="todoListMain">
                <div className="Header">
                <form onSubmit={onSearchSubmit}>
                    <input 
                    id="inputBox" 
                    placeholder="Topic"
                    value={searchTodo}
                    onChange={onSearchChange}
                    ref={el => this.input = el} />

                    <button id="addTask" type="submit">Search</button>
                </form>
                </div>
            </div>
        )
    }
    
}

export default Header;