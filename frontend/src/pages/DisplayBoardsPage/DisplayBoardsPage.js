import NavBar from '../../shared/components/Navbar/Navbar'
import BoardsGrid from './components/BoardsGrid/BoardsGrid'

import React, { Component } from 'react';

class DisplayBoardsPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: props.match.params.username
        }
    }

    render() { 
        return (
            <div>
                <NavBar />
                <BoardsGrid username={this.state.username}/>
            </div>
        );
    }
}

export default DisplayBoardsPage;