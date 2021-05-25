import "./Collaborators.css";

import React, { Component } from 'react';

class Collaborators extends Component {

    constructor(props) {
        super(props);
        this.state = { boardObject: this.props.boardObject }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.boardObject!==this.props.boardObject){
            this.setState({boardObject: nextProps.boardObject });
        }
    }

    render() {
        return (
            <div id="collaborators-container">
                <h1> Collaborators </h1>
        
                {
                    this.state.boardObject === null ? <p className="collaborators-items"> No collaborators to display </p> : this.state.boardObject.users.map(user => {
                        return(
                            <p key={user.id}> {user.name} </p>
                        )
                    })
                }
                    
            </div>
        );
    }
}


export default Collaborators;