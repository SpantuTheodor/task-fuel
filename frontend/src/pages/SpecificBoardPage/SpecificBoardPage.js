import NavBar from '../../shared/components/Navbar/Navbar'
import AddTask from './components/AddTask/AddTask'
import TasksGrid from './components/TasksGrid/TasksGrid'

import React, { Component } from 'react';

class SpecificBoardPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: props.match.params.username,
            boardId: props.match.params.boardId
        }
    }

    render() { 
        return (
            <div>
                <NavBar />
                <TasksGrid username={this.state.username} boardId={this.state.boardId} />
            </div>
        );
    }
}

export default SpecificBoardPage;