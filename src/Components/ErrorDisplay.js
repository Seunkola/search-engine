import React, { Component } from 'react'

class ErrorDisplay extends Component {
    render(){
        const error = this.props.error;
        return (
            <div className="theList">
            {
                error ? 
                <p>Something went wrong.</p> 
                : 
                null
            }
            </div>
        );
    }
}

export default ErrorDisplay;