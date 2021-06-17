import "./Collaborators.css";

import addUserToBoardMutation from "../../../../mutations/addUserToBoardMutation";

import React, { Component } from 'react';
import { withApollo } from "react-apollo";

class Collaborators extends Component {

    constructor(props) {
        super(props);
        this.addUserModalRef = React.createRef();
        this.addUserModalInputRef = React.createRef();
        this.state = { 
            boardObject: this.props.boardObject,
            modalIsOpen: false,
        }
        this.handleOnClick = this.handleOnClick.bind(this)
        this.addUserToBoard = this.addUserToBoard.bind(this)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.handleClickOutside = this.handleClickOutside.bind(this)
        this.addUserToBoard = this.addUserToBoard.bind(this)
    }

    static getDerivedStateFromProps(props, state){
        if(props.boardObject !== state.boardObject){
            return {
                boardObject: props.boardObject
            }
        } 
        return null;
    }

    openModal(){
        this.setState({modalIsOpen: true})
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    closeModal(){
        this.setState({modalIsOpen: false})
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.addUserModalRef && !this.addUserModalRef.current.contains(event.target)) {
            this.closeModal()
            this.props.changePassepartoutVisibility()
        }
    }

    handleOnClick(){
        this.props.changePassepartoutVisibility()
        this.openModal()
    }

    addUserToBoard(userName){
        let boardObjectCopy = JSON.parse(JSON.stringify(this.state.boardObject))
        boardObjectCopy.users.push({id: 1, name: userName})
        this.addUserModalInputRef.current.value=""
        this.props.changePassepartoutVisibility()
        this.setState({boardObject: boardObjectCopy, modalIsOpen: false})
    }

    addUserToBoard(event){
        this.props.client.mutate({
            mutation: addUserToBoardMutation,
            variables: {
                boardId: this.state.boardObject.id,
                userName: this.addUserModalInputRef.current.value
            }
        }).then((res) => {
            this.addUserToBoard(this.addUserModalInputRef.current.value)
        }).catch((err) => {
            console.log(err)
        }) 
    }

    render() {
        return (
            <div>
                <h1> Collaborators </h1>
                <p onClick={this.handleOnClick} className="add-user-button"> Add collaborators </p>
                <div className={"add-user-modal" + (this.state.modalIsOpen ? "" : " hidden")} ref={this.addUserModalRef}>
                    <form onSubmit={this.addUserToBoard}>
                        <input placeholder="User name" ref={this.addUserModalInputRef}/>
                        <input type="submit" value="Add User"></input>                       
                    </form>
                </div>                {
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


export default withApollo(Collaborators);