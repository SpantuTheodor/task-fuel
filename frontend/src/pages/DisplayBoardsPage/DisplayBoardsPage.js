import NavBar from '../../shared/components/Navbar/Navbar'
import BoardsGrid from './components/BoardsGrid/BoardsGrid'
import Menu from './components/Menu/Menu'
import ErrorBoundary from '../../shared/components/ErrorBoundary'

import React, { Component } from 'react';

class DisplayBoardsPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: props.match.params.username,
            boardCardIdToDelete: null,
            boardCardToCreate: null
        }
        this.deleteBoardCard = this.deleteBoardCard.bind(this)
        this.createBoardCard = this.createBoardCard.bind(this)
    }

    deleteBoardCard(boardCardIdToDelete) {
        this.setState({boardCardIdToDelete: boardCardIdToDelete});
    }
    
    createBoardCard(boardCardToCreate) {
        this.setState({boardCardToCreate: boardCardToCreate})
    }

    componentDidMount(){
        document.title = `boards | task-fuel`
    }

    render() { 
        return (
            <div>
                <ErrorBoundary>
                    <NavBar />
                    <Menu createBoardCard={this.createBoardCard}/>
                    <BoardsGrid 
                        username={this.state.username} 
                        deleteBoardCard={this.deleteBoardCard} 
                        createBoardCard={this.createBoardCard} 
                        boardCardIdToDelete={this.state.boardCardIdToDelete}
                        boardCardToCreate={this.state.boardCardToCreate}  
                    />
                </ErrorBoundary>
            </div>
        );
    }
}

export default DisplayBoardsPage;