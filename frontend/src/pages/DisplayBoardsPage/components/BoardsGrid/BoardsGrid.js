import "./BoardsGrid.css";

import { getBoardsByUserIdQuery, getUserByUsernameQuery } from '../../../../queries/queries';
import AuthenticationContext from "../../../../contexts/authenticationContext"
import BoardCard from "../BoardCard/BoardCard"

import React, { Component } from "react"
import { withApollo } from "react-apollo";


class BoardsGrid extends Component {

    constructor(props){
        super(props)
        this.state = {
            userId: null,
            boards: []
        }
        this.getUserIdByUsername = this.getUserIdByUsername.bind(this)
        this.displayBoardsByUserId = this.displayBoardsByUserId.bind(this)
    }

    static contextType = AuthenticationContext
    
    componentWillMount(){
        this.getUserIdByUsername()
    }

    getUserIdByUsername(){
        this.props.client.query({
            query: getUserByUsernameQuery,
            variables: {
                username: this.props.username
            }
        }).then((res) => {
            this.setState({userId: res.data.userByUsername.id})
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
    
    displayAllTasks(){
        var data = this.props.getTasksQuery;
        if(data.loading){
            return(
                <div>
                    Loading...
                </div>
            )
        } else {
            return data.tasks.map(task => {
                return(
                    <li id={task.id} > {task.name} </li>
                )
            })
        }
    }

    render(){
        return (
            <div id="display-boards-container">
                <div id="display-boards-left-side-container">
                    <h1> Menu </h1> 
                </div>

                <div id="display-boards-right-side-container">
                    <h1> All Boards </h1>
                    <div className="cards-container">
                        {
                            this.state.boards === [] ? <p> No boards to display </p> : this.state.boards.map(board => {
                                return(
                                    <BoardCard id={board.id} name={board.name} tasks={board.tasks} users={board.users} owner={board.owner} />
                                )
                            })
                        }
                    </div>
                        
                    <h1> Owned Boards </h1>
                        <p> No boards to display </p>
                </div>
            </div>
        );
    }
}

export default withApollo(BoardsGrid);
