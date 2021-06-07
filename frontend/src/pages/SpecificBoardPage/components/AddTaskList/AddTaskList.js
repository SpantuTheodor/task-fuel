import "./AddTaskList.css"

import createTaskListMutation from "../../../../mutations/createTaskListMutation"

import React, { Component } from 'react';
import { withApollo } from "react-apollo"

class AddTaskList extends Component {
    constructor(props) {
        super(props);
        this.addTaskListInputRef = React.createRef();
        this.state = {  }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event){
        event.preventDefault()
        this.createTaskList()
    }

    createTaskList(){
        this.props.client.mutate({
            mutation: createTaskListMutation,
            variables: {
                name: String(this.addTaskListInputRef.current.value),
                boardId: this.props.boardObject.id,
                taskIds: []
            }
        }).then((res) => {
            this.props.addTaskListToBoard({id: res.data.addTaskList.id, name: String(this.addTaskListInputRef.current.value), boardId: this.props.boardObject.id, tasks: []})
            this.addTaskListInputRef.current.value = null
        })
    }

    render() { 
        return (
            <div className="add-list-container">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Add new task list" ref={this.addTaskListInputRef}></input>
                </form>
            </div>
        );
    }
} 
export default withApollo(AddTaskList);