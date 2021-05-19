import "./BoardCard.css";

import React, { Component } from 'react';

class BoardCard extends Component {
    constructor(props){
        super(props)
    }

    render() { 
        return (
            <div className="board-card">
                <p> {this.props.name} </p>
                <p> {this.props.owner.name} </p>
            </div>
        );
    }
}

export default BoardCard;