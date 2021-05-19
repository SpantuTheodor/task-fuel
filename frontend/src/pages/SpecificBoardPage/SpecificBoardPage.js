import NavBar from '../../shared/components/Navbar/Navbar'
import AddTask from './components/AddTask/AddTask'

import React, { Component } from 'react';

class SpecificBoardPage extends Component {
    state = {  }
    render() { 
        return (
            <div>
                <NavBar />
                <AddTask />
            </div>
        );
    }
}

export default SpecificBoardPage;