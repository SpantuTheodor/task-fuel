import "./AddTaskList.css"

import React, { Component } from 'react';

class AddTaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div className="add-list-container">
                <input type="text" placeholder="Add new task list"></input>
            </div>
        );
    }
} 
export default AddTaskList;