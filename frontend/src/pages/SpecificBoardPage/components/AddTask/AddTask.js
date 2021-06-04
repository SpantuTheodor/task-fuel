import "./AddTask.css";

import plusSymbol from '../../../../assets/plus-symbol-icon.png';

import React, { Component } from "react";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { withApollo } from "react-apollo";
import ReactModal from 'react-modal';

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

ReactModal.setAppElement('#root')

class AddTask extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: "",
            description: "",
            startDate: new Date(),
            endDate: new Date(),
            modalIsOpen: false
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
        // event.preventDefault();
        // this.props.addTaskMutation({
        //     variables: {
        //         name: this.state.name,
        //         description: this.state.description,
        //         startDate: this.state.startDate,
        //         endDate: this.state.endDate,
        //         assigneeId: "60854bdd09627f692050afbd"
        //     },
        //     refetchQueries: [{
        //         query: getTasksByBoardIdQuery
        //     }]
        // })
    }

    render(){

        return (
            <div>
                <div className="add-task-button" onClick={this.openModal}>
                    <img className="add-task-plus-symbol"src={plusSymbol} />
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
                        <div className="form-items" id="datetime-picker">
                            <DateTimePickerComponent id="start-date" onChange = { (event) => { this.setState({startDate: event.target.value}); console.log(this.state.startDate )} } />
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
