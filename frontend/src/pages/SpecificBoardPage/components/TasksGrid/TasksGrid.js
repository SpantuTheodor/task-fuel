import "./TasksGrid.css"

import TaskCard from "../TaskCard/TaskCard"
import TasksList from "../TasksList/TasksList"

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
                <div className="task-cards-container">
                    {
                        this.state.boardObject === null ? <p> No tasks to display </p> : this.state.boardObject.tasks.map(task => {
                            return(
                                <TaskCard key={task.id} name={task.name} description={task.description} assignee={task.assignee} />
                            )
                        })
                    }
                </div>
                <TasksList name="List name"/>
            </div>
        );
    }
}

export default withApollo(TasksGrid);
