import "./AddTask.css"

import plusSymbol from '../../../../assets/plus-symbol-icon.png'
import addTaskMutation from '../../../../mutations/addTaskMutation'

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
        this.usersInputSelectRef = React.createRef()
        this.state = {
            name: "",
            description: "",
            startDate: new Date(),
            endDate: new Date(),
            modalIsOpen: false,
            boardObject: this.props.boardObject,
            taskListId: this.props.taskListId
        }
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    openModal(){
        this.setState({modalIsOpen: true})
    }

    closeModal(){
        this.setState({modalIsOpen: false})
    }

    submitForm(event){
        event.preventDefault();
        this.props.client.mutate({
            mutation: addTaskMutation,
            variables: {
                name: this.state.name,
                description: this.state.description,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                assigneeId: null,
                taskListId: String(this.state.taskListId)
            }
        }).then((res) => {
            this.closeModal()
            this.props.addTaskToBoard(this.state.taskListId, {
                id: res.data.addTask.id,
                name: this.state.name,
                assignee: null,
            })
        })
    }

    render(){
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
                        <input className="form-items" type="text" placeholder="Task title" onChange = { (event) => this.setState({name: event.target.value}) } />
                        <textarea className="form-items" form="add-task" placeholder="Description" onChange = { (event) => this.setState({description: event.target.value}) } />                
                        
                        <select defaultValue={"default"} ref={this.usersInputSelectRef}>
                            <option value="default" disabled>None</option>
                            {this.state.boardObject.users.map(collaborator =>
                                <option key={collaborator.id} value={collaborator.id}>{collaborator.name}</option>
                            )}
                        </select>
                        
                        <div className="form-items" id="datetime-picker">
                            <DateTimePickerComponent id="start-date" onChange = { (event) => { this.setState({startDate: event.target.value })}} />
                            <DateTimePickerComponent id="end-date" onChange = { (event) => this.setState({endDate: event.target.value}) } />
                        </div>

                        <input className="form-items" type="submit" />
                    </form>
                    
                </ReactModal>
            </div>
        );
    }
}

export default withApollo(AddTask);
