import NavBar from '../../shared/components/Navbar/Navbar'
import Collaborators from './components/Collaborators/Collaborators'
import TasksGrid from './components/TasksGrid/TasksGrid'
import getBoardByIdQuery from '../../queries/getBoardByIdQuery'

import React, { Component } from 'react';
import { withApollo } from "react-apollo";

class SpecificBoardPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: props.match.params.username,
            boardId: props.match.params.boardId,
            boardObject: null,
        }
        this.getBoardById = this.getBoardById.bind(this)
        this.addTaskListToBoard = this.addTaskListToBoard.bind(this)
    }

    componentDidMount() {
        this.getBoardById()
    }

    componentDidUpdate(){
        if(this.state.boardObject != null){
            document.title = `${this.state.boardObject.name} | task-fuel`
        }
    }

    addTaskListToBoard(taskListObject){
        let boardObjectCopy = Object.assign({}, this.state.boardObject)
        boardObjectCopy.taskLists = boardObjectCopy.taskLists.concat([taskListObject])
        this.setState({boardObject: boardObjectCopy})
    }

    getBoardById(){

        this.props.client.query({
            query: getBoardByIdQuery,
            variables: {
                id: this.state.boardId
            }
        }).then((res) => {
            this.setState({boardObject: res.data.board})
        })

    }

    render() {
        console.log(this.state.boardObject)
        return (
            <div id="specific-board-page-container">
                <NavBar />
                <Collaborators boardObject={this.state.boardObject} />
                <TasksGrid boardObject={this.state.boardObject} addTaskListToBoard={this.addTaskListToBoard} />
            </div>
        );
    }
}

export default withApollo(SpecificBoardPage);