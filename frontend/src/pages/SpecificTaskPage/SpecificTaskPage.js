import "./SpecificTaskPage.css"

import getTaskByIdQuery from "../../queries/getTaskByIdQuery"
import Navbar from "../../shared/components/Navbar/Navbar"
import ErrorBoundary from "../../shared/components/ErrorBoundary/ErrorBoundary";

import React, { Component } from 'react';
import { withApollo } from "react-apollo";

class SpecificTaskPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.match.params.username,
            boardId: props.match.params.boardId,
            taskId: props.match.params.taskId,
            taskObject: null,
            error: null
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
            this.setState({taskObject: res.data.task})
        }).catch((err) => {
            this.setState({error: err})
        })
    }

    render() { 

        if (this.state.error) {
            throw this.state.error;
        }

        return ( 
            <div>
                <ErrorBoundary>
                    <Navbar />
                    <div className="specific-task-container">
                        <h1>Name: {this.state.taskObject && this.state.taskObject.name ? this.state.taskObject.name : " - "}</h1>

                        <h3>Task details</h3>
                        <p>Assignee: {this.state.taskObject && this.state.taskObject.assignee ? this.state.taskObject.assignee.name : " - "}</p>
                        <p>Description: {this.state.taskObject && this.state.taskObject.description ? this.state.taskObject.description : " - "}</p>
                        <p>Start date: {this.state.taskObject && this.state.taskObject.startDate ? this.state.taskObject.startDate.slice(0, 19).replace(/-/g, "/").replace("T", " - ") : " - "}</p>
                        <p>End date: {this.state.taskObject && this.state.taskObject.endDate ? this.state.taskObject.endDate.slice(0, 19).replace(/-/g, "/").replace("T", " - ") : " - "}</p>
                        <p>Geographical area:{this.state.taskObject && this.state.taskObject.location ? this.state.taskObject.location : " - "}</p>

                        <h3> Status: {this.state.taskObject && this.state.taskObject.status ? this.state.taskObject.status : " - "} </h3>
                        <p>Proof resource: {this.state.taskObject && this.state.taskObject.resource ? this.state.taskObject.resource : " - "}</p>
                    </div>
                </ErrorBoundary>
            </div>    
        );
    }
}

export default withApollo(SpecificTaskPage)