import React, { Component } from 'react';

class TaskCard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
        <div>
            
            <p>{this.props.name}</p>
            <p>{this.props.description}</p>
            <p>{this.props.assignee.name}</p>

        </div>);
    }
}

export default TaskCard;