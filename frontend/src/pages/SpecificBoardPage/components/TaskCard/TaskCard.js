import "./TaskCard.css"

import threeDotsSymbol from "../../../../assets/three-dots-icon.png"
import deleteTaskMutation from "../../../../mutations/deleteTaskMutation"

import React, { Component } from 'react'
import { withApollo } from "react-apollo"

class TaskCard extends Component {

    constructor(props) {
        super(props);
        this.dropdownMenuRef = React.createRef()
        this.taskCardRef = React.createRef()
        this.state = {
            taskListId: this.props.taskListId,
            taskId: this.props.taskId,
            name: this.props.name,
        }
        this.changeVisibility = this.changeVisibility.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
    }

    changeVisibility(event){
        event.preventDefault();
        event.stopPropagation();
        if(this.dropdownMenuRef.current.style.visibility === "visible"){
            this.props.changePassepartoutVisibility()
            this.taskCardRef.current.style.zIndex=0
            this.dropdownMenuRef.current.style.visibility="hidden"
        }else{
            this.props.changePassepartoutVisibility()
            this.taskCardRef.current.style.zIndex=50
            this.dropdownMenuRef.current.style.visibility="visible"
        }
    }

    deleteTask(event){
        event.preventDefault();
        event.stopPropagation();
        this.props.client.mutate({
            mutation: deleteTaskMutation,
            variables: {
                id: this.state.taskId
            }
        }).then((res) => {
            this.props.deleteTaskFromBoard(this.state.taskListId, this.state.taskId)
            this.props.changePassepartoutVisibility()
        })
    }

    render() { 
        return (
            <div className="task-card" ref={this.taskCardRef}>
                    
                <img className="task-card-threeDotsSymbol" src={threeDotsSymbol} onClick={this.changeVisibility} alt="more options button" />
                    
                <ul ref={this.dropdownMenuRef}>
                        <li> Mark as Done </li>
                        <li> Mark as In Progress </li>
                        <li> Mark as Canceled </li>
                        <li onClick={this.deleteTask}> Delete Task</li>
                </ul>
                    
                {this.props !== null ? 
                <div>
                    <p>{this.props.name}</p> 
                    {this.props.assignee === null ? <p> - </p> : <p>{this.props.assignee.name}</p>}
                    </div>
                : null}
                    

            </div>
        );
    }
}

export default withApollo(TaskCard)