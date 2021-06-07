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

        this.passepartoutRef = React.createRef()

        this.getBoardById = this.getBoardById.bind(this)
        this.addTaskListToBoard = this.addTaskListToBoard.bind(this)
        this.addTaskToBoard = this.addTaskToBoard.bind(this)
        this.deleteTaskListFromBoard = this.deleteTaskListFromBoard.bind(this)
        this.deleteTaskFromBoard = this.deleteTaskFromBoard.bind(this)
        this.changePassepartoutVisibility = this.changePassepartoutVisibility.bind(this)
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
        let boardObjectCopy = JSON.parse(JSON.stringify(this.state.boardObject))
        boardObjectCopy.taskLists.push(taskListObject)
        this.setState({boardObject: boardObjectCopy})
    }

    addTaskToBoard(taskListObjectId, taskObject){
        let boardObjectCopy = JSON.parse(JSON.stringify(this.state.boardObject))
        let index = boardObjectCopy.taskLists.findIndex(taskList => taskList.id === taskListObjectId)
        boardObjectCopy.taskLists[index].tasks.push(taskObject)
        this.setState({boardObject: boardObjectCopy})
    }

    deleteTaskListFromBoard(taskListObjectId){
        let boardObjectCopy = JSON.parse(JSON.stringify(this.state.boardObject))
        boardObjectCopy.taskLists = boardObjectCopy.taskLists.filter(taskList => taskList.id !== taskListObjectId)
        this.setState({boardObject: boardObjectCopy})
    }

    deleteTaskFromBoard(taskListObjectId, taskObjectId){
        let boardObjectCopy = JSON.parse(JSON.stringify(this.state.boardObject))
        let index = boardObjectCopy.taskLists.findIndex(taskList => taskList.id === taskListObjectId)
        boardObjectCopy.taskLists[index].tasks = boardObjectCopy.taskLists[index].tasks.filter(task => task.id !== taskObjectId)
        this.setState({boardObject: boardObjectCopy})

    }

    changePassepartoutVisibility(){
        if(this.passepartoutRef.current.style.visibility === "visible"){
            this.passepartoutRef.current.style.zIndex=0
            this.passepartoutRef.current.style.visibility="hidden"
        }else{
            this.passepartoutRef.current.style.zIndex=20
            this.passepartoutRef.current.style.visibility="visible"
        }
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
        return (
            <div id="specific-board-page-container">
                <NavBar />
                <div className="passepartout" ref={this.passepartoutRef}> </div>
                <Collaborators boardObject={this.state.boardObject} />
                <TasksGrid 
                    boardObject={this.state.boardObject} 
                    addTaskListToBoard={this.addTaskListToBoard}
                    addTaskToBoard={this.addTaskToBoard}
                    deleteTaskListFromBoard={this.deleteTaskListFromBoard} 
                    deleteTaskFromBoard={this.deleteTaskFromBoard}
                    changePassepartoutVisibility={this.changePassepartoutVisibility} 
                />
            </div>
        );
    }
}

export default withApollo(SpecificBoardPage);