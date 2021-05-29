import "./TasksGrid.css"

import TaskList from "../TaskList/TaskList"

import React, { Component } from "react"
import { withApollo } from "react-apollo"



class TasksGrid extends Component {

    constructor(props){
        super(props)
        this.state = {
            boardObject: this.props.boardObject
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.boardObject!==this.props.boardObject){
            this.setState({boardObject: nextProps.boardObject });
        }
    }

    render(){
        return (
            <div id="display-tasks-container">

                <h1> Tasks </h1>
                <div className="task-lists-container">
                    {
                        this.state.boardObject === null ? <p> No tasks to display </p> : this.state.boardObject.taskLists.map(taskList => {
                            return(
                                <TaskList key={taskList.id} name={taskList.name} tasks={taskList.tasks} />
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default withApollo(TasksGrid);
