import "./AddTask.css"

import plusSymbol from '../../../../assets/plus-symbol-icon.png'
import createTaskMutation from '../../../../mutations/createTaskMutation'

import React, { Component } from "react"
import ReactModal from 'react-modal'
import { withApollo } from "react-apollo"
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars"

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
}

ReactModal.setAppElement('#root')

class AddTask extends Component {

    constructor(props){
        super(props)
        this.state = {
            name: "",
            description: "",
            startDate: null,
            endDate: null,
            location: "",
            assigneeId: "",
            assigneeName: "",
            modalIsOpen: false,
            boardObject: this.props.boardObject,
            taskListId: this.props.taskListId,
            taskListNumber: this.props.taskListNumber,
            error: null
        }
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.stateReset = this.stateReset.bind(this)
    }

    openModal(){
        this.setState({modalIsOpen: true})
    }

    closeModal(){
        this.setState({modalIsOpen: false})
    }

    stateReset(){
        this.setState({
            name: "",
            description: "",
            startDate: null,
            endDate: null,
            location: "",
            assigneeId: ""
        })
    }

    submitForm(event){

        event.preventDefault();
        console.log(this.state.boardObject.users.filter(assignee => assignee.id === this.state.assigneeId)[0].name)
        this.props.client.mutate({
            mutation: createTaskMutation,
            variables: {
                name: this.state.name,
                description: this.state.description,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                assigneeId: this.state.assigneeId,
                taskListId: String(this.state.taskListId),
                location: this.state.location,
                status: "not yet started",
                order: this.state.boardObject.taskLists[this.state.taskListNumber].tasks.length
            }
        }).then((res) => {
            this.closeModal()

            this.props.addTaskToBoard(this.state.taskListId, {
                id: res.data.addTask.id,
                name: this.state.name,
                assignee: {
                    id: this.state.assigneeId,
                    name: this.state.boardObject.users.filter(assignee => assignee.id === this.state.assigneeId)[0].name
                }
            })
            
        }).catch((err) => {
            this.setState({error: err})
        })
    }

    render(){
        
        if (this.state.error) {
            throw this.state.error;
        }

        return (
            <div>
                <div className="add-task-button" onClick={this.openModal}>
                    <img className="add-task-plus-symbol"src={plusSymbol} alt="add task button"/>
                    <p className="add-task-p"> Add task </p>
                </div>
                    
                <ReactModal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Create Task"
                    >
                    
                    <form id="add-task" onSubmit={ this.submitForm.bind(this) }>
                        <input name="title" className="form-items" type="text" placeholder="Task title" onChange = { (event) => this.setState({name: event.target.value}) } />
                        <textarea name="description" className="form-items" form="add-task" placeholder="Description" onChange = { (event) => this.setState({description: event.target.value}) } />                
                        
                        <select name="assignee" defaultValue={"default"} onChange = { (event) => this.setState({assigneeId: event.target.value}) }>
                            <option value="default" disabled>None</option>
                            {this.state.boardObject.users.map(collaborator =>
                                <option key={collaborator.id} value={collaborator.id}>{collaborator.name}</option>
                            )}
                        </select>
                        
                        <div className="form-items" id="datetime-picker">
                            <DateTimePickerComponent name="startDate" id="start-date" onChange = { (event) => { this.setState({startDate: event.target.value })}} />
                            <DateTimePickerComponent name="endDate" id="end-date" onChange = { (event) => this.setState({endDate: event.target.value}) } />
                        </div>

                        <input name="location" className="form-items" type="text" form="add-task" placeholder="location" onChange = { (event) => this.setState({location: event.target.value}) } />

                        <input className="form-items" type="submit" />
                    </form>
                    
                </ReactModal>
            </div>
        );
    }
}

export default withApollo(AddTask);
