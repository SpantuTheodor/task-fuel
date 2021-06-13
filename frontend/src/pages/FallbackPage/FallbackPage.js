import "./FallbackPage.css"

import Navbar from '../../shared/components/Navbar/Navbar';

import React, { Component } from 'react';

class FallbackPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            message: this.props.message
        }
    }

    render() { 
        return ( 
            <div>
                <Navbar />
                <h1 className="fallback-message"> {this.state.message} </h1>
            </div>
        );
    }
}

export default FallbackPage;