import React, { Component } from 'react';

class Button extends Component {
    render(){
        const {
        onClick,
        className,
        children
        } = this.props;

        return(
            <button 
                className={className} 
                onClick={onClick}
                type="button"
                >
                {
                    !children
                    ?
                    <i className="fas fa-trash-alt"></i>
                    :
                    children
                }
            </button>
        );
    }
}

Button.defaultProps = {
    className: '',
};

export default Button;