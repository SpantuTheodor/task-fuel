import "./Collaborators.css";

import React, { Component } from 'react';

class Collaborators extends Component {

    constructor(props) {
        super(props);
        this.state = { boardObject: this.props.boardObject }
    }

    static getDerivedStateFromProps(props, state){
        if(props.boardObject !== state.boardObject){
            return {
                boardObject: props.boardObject
            }
        } 
        return null;
    }

    render() {
        return (
            <div>
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