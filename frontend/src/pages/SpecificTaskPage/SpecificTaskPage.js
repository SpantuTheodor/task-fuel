import "./SpecificTaskPage.css"

import Navbar from "../../shared/components/Navbar/Navbar"
import React, { Component } from 'react';

class SpecificTaskPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <Navbar />
                <div className="specific-task-container">
                    <h1>Name:</h1>
                    <h3>Task details</h3>
                    <p>Assignee:</p>
                    <p>Collaborators:</p>
                    <p>Description:</p>
                    <p>Start date:</p>
                    <p>End date:</p>
                    <p>Geographical area:</p>

                    <h3> Status:</h3>
                    <p>Proof resource:</p>
                </div>
            </div>    
        );
    }
}

export default SpecificTaskPage