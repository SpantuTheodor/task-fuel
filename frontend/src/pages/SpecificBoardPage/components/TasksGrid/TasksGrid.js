import "./TasksGrid.css"

import TaskList from "../TaskList/TaskList"
import AddTaskList from "../AddTaskList/AddTaskList"

import React, { Component } from "react"
import { withApollo } from "react-apollo"



class TasksGrid extends Component {

    constructor(props){
        super(props)
        this.state = {
            boardObject: this.props.boardObject
        }
    }

    static getDerivedStateFromProps(props, state){
        if(props.boardObject !== state.boardObject){
            return {
                boardObject: props.boardObject
            }
        }
        return null 
    }

    render(){
        return (
            <div id="display-tasks-container">

                <h1> Tasks </h1>
                <div className="task-lists-container">
                    {
                        this.state.boardObject === null ? <p> No tasks to display </p> : this.state.boardObject.taskLists.map(taskList => {
                            return(
                                <TaskList 
                                    key={taskList.id} 
                                    taskListId={taskList.id} 
                                    name={taskList.name} 
                                    tasks={taskList.tasks} 
                                    boardObject={this.state.boardObject}
                                    addTaskToBoard={this.props.addTaskToBoard} 
                                    deleteTaskListFromBoard={this.props.deleteTaskListFromBoard}
                                    deleteTaskFromBoard={this.props.deleteTaskFromBoard}
                                    changePassepartoutVisibility={this.props.changePassepartoutVisibility}
                                />
                            )
                        })
                    }
                
                <AddTaskList 
                    boardObject={this.state.boardObject} 
                    addTaskListToBoard={this.props.addTaskListToBoard} 
                />

                <div className="horizontal-spacer"></div>
                </div>
                            
            </div>
        );
    }
}

export default withApollo(TasksGrid);
