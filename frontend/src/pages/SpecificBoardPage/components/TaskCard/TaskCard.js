import "./TaskCard.css"

import React, { Component } from 'react';

class TaskCard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
        <div className="task-card">
            
            <p>{this.props.name}</p>
            {this.props.assignee === null ? <p> - </p> : <p>{this.props.assignee.name}</p>}

        </div>);
    }
}

export default TaskCard;