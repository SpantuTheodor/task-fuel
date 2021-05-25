import NavBar from '../../shared/components/Navbar/Navbar'
import BoardsGrid from './components/BoardsGrid/BoardsGrid'
import Menu from './components/Menu/Menu'

import React, { Component } from 'react';

class DisplayBoardsPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: props.match.params.username
        }
    }

    componentDidMount(){
        document.title = `boards | task-fuel`
    }

    render() { 
        return (
            <div>
                <NavBar />
                <Menu />
                <BoardsGrid username={this.state.username}/>
            </div>
        );
    }
}

export default DisplayBoardsPage;