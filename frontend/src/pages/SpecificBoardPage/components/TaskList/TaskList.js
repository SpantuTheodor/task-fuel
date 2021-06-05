import "./TaskList.css"

import TaskCard from "../TaskCard/TaskCard"
import AddTask from "../AddTask/AddTask"
import xSymbol from "../../../../assets/x-icon.png"
import deleteTaskListMutation from "../../../../mutations/deleteTaskListMutation"

import React, { Component } from 'react'
import { withApollo } from "react-apollo"

class TaskList extends Component {
    
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.state = {
            taskListId: this.props.taskListId,
            name: this.props.name,
            tasks: this.props.tasks,
            boardObject: this.props.boardObject,
            showInputItem: false,
            containerHeight: `${120 + this.props.tasks.length*85}px`
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleClickOutside = this.handleClickOutside.bind(this)
        this.deleteTaskList = this.deleteTaskList.bind(this)

    }

    componentDidUpdate(){
        this.inputRef.current.select();
        if(this.state.showInputItem){
            document.addEventListener('click', this.handleClickOutside, true);
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.boardObject!==this.props.boardObject){
            this.setState({boardObject: nextProps.boardObject, tasks: nextProps.tasks, containerHeight: `${120 + nextProps.tasks.length*85}px`});
        }
    }

    handleNameChange(event){
        event.preventDefault()
        this.setState({showInputItem: true})
    }

    handleClickOutside(event){
        if(event.target.id !== this.inputRef.current.id)
        {
            this.setState({showInputItem: false})
            document.removeEventListener('click', this.handleClickOutside, true)
        } 
    }

    deleteTaskList(){
        this.props.client.mutate({
            mutation: deleteTaskListMutation,
            variables: {
                id: this.state.taskListId
            }
        }).then((res) => {
            this.props.deleteTaskListFromBoard(this.state.taskListId)
        })
    }

    render() { 
        return ( 
            <div className="tasks-list-container" style={{height: this.state.containerHeight}}>
                
                <img className="tasks-list-xSymbol" src={xSymbol} onClick={this.deleteTaskList} />
                <p className={this.state.showInputItem ? 'tasks-list-title hidden' : 'tasks-list-title'} onClick={this.handleNameChange}> {this.state.name} </p>
                <input id={`list-${this.props.name}`} className={!this.state.showInputItem ? 'tasks-list-title hidden' : 'tasks-list-title'} type="text" defaultValue={this.state.name} ref={this.inputRef}/>
                
                {this.state && this.state.tasks.length ? 
                    <div className="task-cards-container">
                        {
                            this.state.tasks.map(task => {
                                return(
                                    <TaskCard 
                                        key={task.id}
                                        taskListId={this.state.taskListId}
                                        taskId={task.id}
                                        name={task.name} 
                                        description={task.description} 
                                        assignee={task.assignee}
                                        deleteTaskFromBoard={this.props.deleteTaskFromBoard}
                                        changePassepartoutVisibility={this.props.changePassepartoutVisibility}
                                    />
                                )
                            })
                        }
                    </div>
                
                : null
                }

                <AddTask 
                    taskListId={this.state.taskListId} 
                    boardObject={this.state.boardObject} 
                    addTaskToBoard={this.props.addTaskToBoard}
                />

            </div>
        );
    }
}

export default withApollo(TaskList)