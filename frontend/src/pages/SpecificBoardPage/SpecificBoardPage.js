import NavBar from '../../shared/components/Navbar/Navbar'
import AddTask from './components/AddTask/AddTask'
import TaskGrid from './components/TaskGrid/TaskGrid'

import React, { Component } from 'react';

class SpecificBoardPage extends Component {
    state = {  }
    render() { 
        return (
            <div>
                <NavBar />
                <TaskGrid />
                <AddTask />
            </div>
        );
    }
}

export default SpecificBoardPage;