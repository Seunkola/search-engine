import React, { Component } from 'react';
import '../Styles/loading.css';

class Loading extends Component {

    render(){
        return (
            <div>
                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                Loading...
            </div>
        )
    }
}

export default Loading;