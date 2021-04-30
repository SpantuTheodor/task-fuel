import React, { Component } from "react";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { addTaskMutation, getTasksQuery } from "../../queries/queries";
import { graphql } from "react-apollo";
import {flowRight as compose} from 'lodash';


import "./AddTask.css";

class AddTask extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: "",
            description: "",
            startDate: new Date(),
            endDate: new Date()
        }
    }

    submitForm(e){
        e.preventDefault();    
        this.props.addTaskMutation({
            variables: {
                name: this.state.name,
                description: this.state.description,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                assigneeId: "60854bdd09627f692050afbd"
            },
            refetchQueries: [{
                query: getTasksQuery
            }]
        })
    }

    render(){

        return (
            <div>
                
                <form id="add-task" onSubmit={ this.submitForm.bind(this) }>
                        <input className="form-items" type="text" placeholder="Task title" onChange = { (e) => this.setState({name: e.target.value}) } />
                        <textarea className="form-items" form="add-task" placeholder="Description" onChange = { (e) => this.setState({description: e.target.value}) } />                
                    <div className="form-items" id="datetime-picker">
                        <DateTimePickerComponent id="start-date" onChange = { (e) => { this.setState({startDate: e.target.value}); console.log(this.state.startDate )} } />
                        <DateTimePickerComponent id="end-date" onChange = { (e) => this.setState({endDate: e.target.value}) } />
                    </div>

                    <input className="form-items" type="submit" />
                </form>

            </div>
        );
    }
}

export default compose(
    graphql( addTaskMutation, {name: "addTaskMutation"} ),
    graphql(getTasksQuery, {name: "getTasksQuery"})
    ) (AddTask);
