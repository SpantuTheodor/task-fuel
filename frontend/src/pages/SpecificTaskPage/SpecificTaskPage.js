import "./SpecificTaskPage.css"

import getTaskByIdQuery from "../../queries/getTaskByIdQuery"
import Navbar from "../../shared/components/Navbar/Navbar"
import ErrorBoundary from "../../shared/components/ErrorBoundary/ErrorBoundary";

import CryptoJS from "crypto-js";
import React, { Component } from 'react';
import { withApollo } from "react-apollo";
import { withRouter } from 'react-router-dom';

class SpecificTaskPage extends Component {
    constructor(props) {
        super(props);
        if(!props.location.search){
            this.state = {
                username: props.match.params.username,
                boardId: props.match.params.boardId,
                taskId: props.match.params.taskId,
                taskObject: null,
                error: null
            }
        } else {
            console.log(props)
            this.state = {
                taskObject: JSON.parse(new URLSearchParams(decodeURI(this.props.location.search)).get("taskObject")),
                error: null
            }
        }
        this.getTaskById = this.getTaskById.bind(this)
        this.getAnonymousURL = this.getAnonymousURL.bind(this)
    }

    componentDidMount(){
        if(!this.props.location.search){
            this.getTaskById()
        }
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

    getAnonymousURL(){
        console.log(window.location.href.split('/')[2])
        console.log(navigator.clipboard.writeText(encodeURI("http://" + window.location.href.split('/')[2] + "/" + CryptoJS.MD5(this.state) + "?taskObject=" + JSON.stringify(this.state.taskObject))))
        alert("The link has been written to clipboard")
    }

    render() { 

        if (this.state.error) {
            throw this.state.error;
        }
        
        return ( 
            <div className="specific-task-page-container">
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

                        { !this.props.location.search ? <button onClick={this.getAnonymousURL} className="task-anon-button"> Get Anonymous URL </button> : null}
                    </div>
                </ErrorBoundary>
            </div>    
        );
    }
}

export default withRouter(withApollo(SpecificTaskPage))