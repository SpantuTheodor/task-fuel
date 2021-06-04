import "./TaskList.css"

import TaskCard from "../TaskCard/TaskCard"
import AddTask from "../AddTask/AddTask"

import React, { Component } from 'react'

class TaskList extends Component {
    
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.state = {
            name: this.props.name,
            tasks: this.props.tasks,
            showInputItem: false,
            containerHeight: `${120 + this.props.tasks.length*90}px` 
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleClickOutside = this.handleClickOutside.bind(this)

    }

    componentDidUpdate(){
        this.inputRef.current.select();
        if(this.state.showInputItem){
            document.addEventListener('click', this.handleClickOutside, true);
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

    render() { 
        return ( 
            <div className="tasks-list-container" style={{height: this.state.containerHeight}}>
                <div className="ten-px-spacer"></div>
                <h3 className={this.state.showInputItem ? 'tasks-list-title hidden' : 'tasks-list-title'} onClick={this.handleNameChange}> {this.state.name} </h3>
                <input id={`list-${this.props.name}`} className={!this.state.showInputItem ? 'tasks-list-title hidden' : 'tasks-list-title'} type="text" defaultValue={this.state.name} ref={this.inputRef}/>
                
                <div className="task-cards-container">
                    {
                        this.state.tasks === null ? <p> No tasks to display </p> : this.state.tasks.map(task => {
                            return(
                                <TaskCard key={task.id} name={task.name} description={task.description} assignee={task.assignee} />
                            )
                        })
                    }
                </div>
                
                <AddTask />

            </div>
        );
    }
}

export default TaskList