import "./TaskCard.css"

import threeDotsSymbol from "../../../../assets/three-dots-icon.png"
import verifiedSymbol from "../../../../assets/verified-icon.png"
import inProgressSymbol from "../../../../assets/in-progress-icon.png"
import canceledSymbol from "../../../../assets/canceled-icon.png"

import deleteTaskMutation from "../../../../mutations/deleteTaskMutation"
import updateTaskMutation from "../../../../mutations/updateTaskMutation"

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
            boardId: this.props.boardId,
            name: this.props.name,
            status: this.props.status,
            error: null
        }
        this.changeVisibility = this.changeVisibility.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
    }

    changeVisibility(event){
        event.preventDefault();
        event.stopPropagation();
        if(this.dropdownMenuRef.current.style.visibility === "visible"){
            this.dropdownMenuRef.current.style.visibility="hidden"
            this.props.changePassepartoutVisibility()
            this.taskCardRef.current.style.zIndex=0
        }else{
            this.dropdownMenuRef.current.style.visibility="visible"
            this.props.changePassepartoutVisibility()
            this.taskCardRef.current.style.zIndex=50
        }
    }

    deleteTask(event){
        event.preventDefault();
        event.stopPropagation();
        console.log(this.state.status)
        this.props.client.mutate({
            mutation: deleteTaskMutation,
            variables: {
                id: this.state.taskId
            }
        }).then((res) => {
            this.props.deleteTaskFromBoard(this.state.taskListId, this.state.taskId)
            this.props.changePassepartoutVisibility()
        }).catch((err) => {
            this.setState({error: err})
        })
    }

    updateTaskStatus(event, status){
        
        event.preventDefault()
        console.log(this.state.boardId)
        this.props.client.mutate({
            mutation: updateTaskMutation,
            variables: {
                id: this.state.taskId,
                boardId: this.state.boardId,
                name: this.state.name,
                status: status,
                date: new Date()
            }
        }).then((res) => {
            this.setState({status: status})
            this.changeVisibility(event)
        }).catch((err) => {
            this.setState({error: err})
        })
    }

    render() { 

        if (this.state.error) {
            throw this.state.error;
        }

        return (
            <div className="task-card" ref={this.taskCardRef}>
                    
                <img className="task-card-threeDotsSymbol" src={threeDotsSymbol} onClick={this.changeVisibility} alt="more options button" />
                { this.state.status === "done" ? <img className="task-card-verifiedSymbol" src={verifiedSymbol} alt="task done icon" /> : null }  
                { this.state.status === "in progress" ? <img className="task-card-verifiedSymbol" src={inProgressSymbol} alt="task in progress icon" /> : null }  
                { this.state.status === "canceled" ? <img className="task-card-verifiedSymbol" src={canceledSymbol} alt="task canceled icon" /> : null }  


                <ul ref={this.dropdownMenuRef}>
                    <li onClick={(event) => this.updateTaskStatus(event, "done")} > Mark as Done </li>
                    <li onClick={(event) => this.updateTaskStatus(event, "in progress")} > Mark as In Progress </li>
                    <li onClick={(event) => this.updateTaskStatus(event, "canceled")} > Mark as Canceled </li>
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