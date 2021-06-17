import "./TaskList.css"

import TaskCard from "../TaskCard/TaskCard"
import AddTask from "../AddTask/AddTask"
import xSymbol from "../../../../assets/x-icon.png"
import deleteTaskListMutation from "../../../../mutations/deleteTaskListMutation"
import AuthenticationContext from "../../../../contexts/authenticationContext"
import updateTaskListMutation from "../../../../mutations/updateTaskListMutation"

import { Link } from 'react-router-dom';
import React, { Component } from 'react'
import { withApollo } from "react-apollo"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import _ from "lodash"

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
            containerHeight: `${120 + this.props.tasks.length*85}px`,
            error: null
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleClickOutside = this.handleClickOutside.bind(this)
        this.deleteTaskList = this.deleteTaskList.bind(this)
        this.handleOnDragEnd = this.handleOnDragEnd.bind(this)
    }

    static contextType = AuthenticationContext

    componentDidMount(){
        let sortedTasks = _.sortBy(this.props.tasks, "order")
        if(sortedTasks !== this.state.tasks){
            this.setState({tasks: sortedTasks})
        }
    }
    componentDidUpdate(){
        this.inputRef.current.select();
        if(this.state.showInputItem){
            document.addEventListener('click', this.handleClickOutside, true);
        }
    }

    static getDerivedStateFromProps(props, state){
        if(props.boardObject !== state.boardObject || props.tasks !== state.tasks){
            let sortedTasks = _.sortBy(props.tasks, "order")
            if(sortedTasks !== state.tasks){
                return {
                    boardObject: props.boardObject,
                    tasks: sortedTasks,
                    containerHeight: `${120 + props.tasks.length*85}px`
                }
            } else {
                return {
                    boardObject: props.boardObject,
                    tasks: props.tasks,
                    containerHeight: `${120 + props.tasks.length*85}px`
                }
            }
        } 
        return null
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
        }).catch((err) => {
            this.setState({error: err})
        })
    }

    handleOnDragEnd(result){
        if(!result.destination) return;
        console.log("TASK", this.state.tasks)
        const items = Array.from(this.state.tasks)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)
        console.log(items)
        let itemIds = items.map((item) => (
            item.id
        ))
        console.log("ITEMS", items)
        console.log(itemIds)

        items.map((item,index) => { 
            item.order = index
        })

        this.props.client.mutate({
            mutation: updateTaskListMutation,
            variables: {
                id: this.state.taskListId,
                taskIds: itemIds
            }
        }).catch((err) => {
            this.setState({error: err})
        })
        this.props.changeTaskOrderOnBoard(this.state.taskListId, items)
    }

    render() { 

        if (this.state.error) {
            throw this.state.error;
        }

        return ( 
            <div className="tasks-list-container" style={{height: this.state.containerHeight}}>
                
                <img className="tasks-list-xSymbol" src={xSymbol} onClick={this.deleteTaskList} alt="delete task list button"/>
                <p className={this.state.showInputItem ? 'tasks-list-title hidden' : 'tasks-list-title'} onClick={this.handleNameChange}> {this.state.name} </p>
                <input className={!this.state.showInputItem ? 'tasks-list-title hidden' : 'tasks-list-title'} type="text" defaultValue={this.state.name} ref={this.inputRef}/>
                
                {this.state && this.state.tasks.length ? 
                    <div className="task-cards-container">
                        <DragDropContext onDragEnd={this.handleOnDragEnd}>
                            <Droppable droppableId={"tasks"}>
                                {(provided) => (
                                    <ul className="task-cards-ul" {...provided.droppableProps} ref={provided.innerRef}>
                                    {    
                                        this.state.tasks.map((task, index) => {
                                            return(
                                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                                    {(provided) => (
                                                    <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}> 
                                                        <Link to={`/${this.context.username}/board/${this.state.boardObject.id}/task/${task.id}`} className="task-card-anchor">
                                                            <TaskCard 
                                                                key={task.id}
                                                                boardId={this.state.boardObject.id}
                                                                taskListId={this.state.taskListId}
                                                                taskId={task.id}
                                                                name={task.name} 
                                                                description={task.description} 
                                                                assignee={task.assignee}
                                                                status={task.status}
                                                                deleteTaskFromBoard={this.props.deleteTaskFromBoard}
                                                                changePassepartoutVisibility={this.props.changePassepartoutVisibility}
                                                            />
                                                        </Link>
                                                    </li>
                                                    )}
                                                </Draggable>
                                            )
                                        })
                                    }
                                    {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                
                : null
                }

                <AddTask 
                    taskListId={this.state.taskListId} 
                    boardObject={this.state.boardObject} 
                    addTaskToBoard={this.props.addTaskToBoard}
                    taskListNumber={this.props.taskListNumber}
                />

            </div>
        );
    }
}

export default withApollo(TaskList)