import "./SpecificTaskPage.css"

import getTaskByIdQuery from "../../queries/getTaskByIdQuery"
import Navbar from "../../shared/components/Navbar/Navbar"

import React, { Component } from 'react';
import { withApollo } from "react-apollo";

class SpecificTaskPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.match.params.username,
            boardId: props.match.params.boardId,
            taskId: props.match.params.taskId,
            taskObject: null
        }
        this.getTaskById = this.getTaskById.bind(this)
    }

    componentDidMount(){
        this.getTaskById()
    }

    getTaskById() {
        this.props.client.query({
            query: getTaskByIdQuery,
            variables: {
                id: this.state.taskId
            },
            fetchPolicy: 'no-cache'
        }).then((res) => {
            console.log(res)
            this.setState({taskObject: res.data.task})
            console.log(this.state.taskObject)
        })
    }

    render() { 
        return ( 
            <div>
                <Navbar />
                <div className="specific-task-container">
                    <h1>Name: {this.state.taskObject && this.state.taskObject.name ? this.state.taskObject.name : "No name to display"}</h1>
                    <h3>Task details</h3>
                    <p>Assignee: {this.state.taskObject && this.state.taskObject.assignee ? this.state.taskObject.assignee.name : "No name to display"}</p>
                    <p>Collaborators: {this.state.taskObject && this.state.taskObject.name}</p>
                    <p>Description: {this.state.taskObject && this.state.taskObject.description ? this.state.taskObject.description : "No name to display"}</p>
                    <p>Start date: {this.state.taskObject && this.state.taskObject.startDate ? this.state.taskObject.startDate.slice(0, 19).replace(/-/g, "/").replace("T", " - ") : "No name to display"}</p>
                    <p>End date: {this.state.taskObject && this.state.taskObject.endDate ? this.state.taskObject.endDate.slice(0, 19).replace(/-/g, "/").replace("T", " - ") : "No name to display"}</p>
                    <p>Geographical area:{this.state.taskObject && this.state.taskObject.name}</p>

                    <h3> Status:</h3>
                    <p>Proof resource:</p>
                </div>
            </div>    
        );
    }
}

export default withApollo(SpecificTaskPage)