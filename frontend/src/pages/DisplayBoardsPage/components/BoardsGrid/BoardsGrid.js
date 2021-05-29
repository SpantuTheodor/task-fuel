import "./BoardsGrid.css"

import getBoardsByUserIdQuery from '../../../../queries/getBoardsByUserIdQuery'
import getUserByUsernameQuery from '../../../../queries/getUserByUsernameQuery'
import AuthenticationContext from "../../../../contexts/authenticationContext"
import BoardCard from "../BoardCard/BoardCard"

import React, { Component } from "react"
import { withApollo } from "react-apollo"
import { Link } from 'react-router-dom'


class BoardsGrid extends Component {

    constructor(props){
        super(props)
        this.state = {
            userId: null,
            username: null,
            boards: []
        }
        this.getUserIdByUsername = this.getUserIdByUsername.bind(this)
        this.displayBoardsByUserId = this.displayBoardsByUserId.bind(this)
    }

    static contextType = AuthenticationContext
    
    componentDidMount(){
        this.getUserIdByUsername()
    }

    getUserIdByUsername(){
        this.props.client.query({
            query: getUserByUsernameQuery,
            variables: {
                username: this.props.username
            }
        }).then((res) => {
            this.setState({userId: res.data.userByUsername.id, username: this.props.username})
        }).then(() => {
            this.displayBoardsByUserId()
        })
    }

    displayBoardsByUserId() {
        this.props.client.query({
            query: getBoardsByUserIdQuery,
            variables: {
                id: this.state.userId
            }
        }).then((res) => {
            let newBoards = []
            res.data.boardsByUserId.map(board => {
                newBoards.push({
                    id:   board.id,
                    name: board.name,
                    tasks: board.tasks,
                    users: board.users,
                    owner: board.owner
                })
            })
            this.setState({boards: [...this.state.boards].concat(newBoards) })
        })
    }
    
    render(){
        return (
            <div id="display-boards-container">

                <h1> All Boards </h1>
                    <div className="board-cards-container">
                        {
                            this.state.boards === [] ? <p> No boards to display </p> : this.state.boards.map(board => {
                                return(
                                    <Link key={board.id} to={`/${this.state.username}/board/${board.id}`} className="board-card-anchor">
                                        <BoardCard boardId={board.id} name={board.name} tasks={board.tasks} owner={board.owner} />
                                    </Link>
                                )
                            })
                        }
                    </div>
                        
                <h1> Owned Boards </h1>
                <p> No boards to display </p>

            </div>
        )
    }
}

export default withApollo(BoardsGrid)
