import "./BoardsGrid.css"

import getBoardsByUserIdQuery from '../../../../queries/getBoardsByUserIdQuery'
import getUserByUsernameQuery from '../../../../queries/getUserByUsernameQuery'
import AuthenticationContext from "../../../../contexts/authenticationContext"
import BoardCard from "../BoardCard/BoardCard"

import React, { Component } from "react"
import { withApollo } from "react-apollo"
import { Link } from 'react-router-dom'
import _ from "lodash"

class BoardsGrid extends Component {

    constructor(props){
        super(props)
        this.state = {
            userId: null,
            username: null,
            boards: [],
            boardCardIdToDelete: this.props.boardCardIdToDelete,
            error: null
        }
        this.getUserIdByUsername = this.getUserIdByUsername.bind(this)
        this.displayBoardsByUserId = this.displayBoardsByUserId.bind(this)
    }

    static contextType = AuthenticationContext
    
    componentDidMount(){
        this.getUserIdByUsername()
    }

    componentDidUpdate(prevProps) {
        if (this.props.boardCardIdToDelete !== prevProps.boardCardIdToDelete) {
            
            let boardCardIdToDelete = this.props.boardCardIdToDelete
            let newBoards = this.state.boards.filter(function(board) {
                return board.id !== boardCardIdToDelete;
            });

            this.setState({
                boardCardIdToDelete: this.props.boardCardIdToDelete,
                boards: newBoards
            });

        } else if (this.props.boardCardToCreate !== prevProps.boardCardToCreate) {
            let newBoards = [...this.state.boards].concat(this.props.boardCardToCreate)
            this.setState({
                boardCardIdToDelete: this.props.boardCardIdToDelete,
                boards: newBoards
            });
        }
    }

    getUserIdByUsername(){
        this.props.client.query({
            query: getUserByUsernameQuery,
            variables: {
                username: this.props.username
            },
            fetchPolicy: 'no-cache'
        }).then((res) => {
            this.setState({userId: res.data.userByUsername.id, username: this.props.username})
        }).then(() => {
            this.displayBoardsByUserId()
        }).catch((err) => {
            this.setState({error: err})
        })
    }

    displayBoardsByUserId() {
        this.props.client.query({
            query: getBoardsByUserIdQuery,
            variables: {
                id: this.context.userId
            },
            fetchPolicy: 'no-cache'
        }).then((res) => {
            let newBoards = []
            res.data.boardsByUserId.map(board => {
                return newBoards.push({
                    id:   board.id,
                    name: board.name,
                    tasks: board.tasks,
                    users: board.users,
                    owner: board.owner
                })
            })
            this.setState({boards: [...this.state.boards].concat(newBoards) })
        }).catch((err) => {
            this.setState({error: err})
        })
    }

    shouldComponentUpdate(nextProps, nextState){
        return this.state.error === null
    }

    render(){
                
        if (this.state.error) {
            throw this.state.error;
        }

        return (
            <div id="display-boards-container">

                <h1> All Boards </h1>
                    <div className="board-cards-container">
                        {
                            this.state.boards === [] ? <p> No boards to display </p> : this.state.boards.map(board => {
                                return(
                                    <Link key={board.id} to={`/${this.state.username}/board/${board.id}`} className="board-card-anchor">
                                        <BoardCard boardId={board.id} name={board.name} tasks={board.tasks} owner={board.owner} deleteBoardCard={this.props.deleteBoardCard} />
                                    </Link>
                                )
                            })
                        }
                    </div>
                        
                <h1> Owned Boards </h1>
                <div className="board-cards-container"> 
                    {
                        this.state.boards === [] ? <p> No boards to display </p> : this.state.boards.filter((board) => board.owner.name === this.props.username).map(board => {
                            return(
                                <Link key={board.id} to={`/${this.state.username}/board/${board.id}`} className="board-card-anchor">
                                    <BoardCard boardId={board.id} name={board.name} tasks={board.tasks} owner={board.owner} deleteBoardCard={this.props.deleteBoardCard} />
                                </Link>
                            )
                        })
                    }
                </div>

            </div>
        )        
    }
}

export default withApollo(BoardsGrid)
