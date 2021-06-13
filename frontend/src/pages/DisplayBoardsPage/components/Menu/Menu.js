import "./Menu.css";

import AuthenticationContext from "../../../../contexts/authenticationContext"
import createBoardMutation from "../../../../mutations/createBoardMutation"

import React, { Component } from 'react';
import { withApollo } from "react-apollo";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.modalRef = React.createRef();
        this.modalInputRef = React.createRef();
        this.state = {
            modalIsOpen: false,
            error: null
        }
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.createBoard = this.createBoard.bind(this)
        this.handleClickOutside = this.handleClickOutside.bind(this)
    }

    static contextType = AuthenticationContext

    openModal(){
        this.setState({modalIsOpen: true})
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    closeModal(){
        this.setState({modalIsOpen: false})
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.modalRef && !this.modalRef.current.contains(event.target)) {
            this.closeModal()
        }
    }

    createBoard(event){
        event.preventDefault()
        this.props.client.mutate({
            mutation: createBoardMutation,
            variables: {
                name: this.modalInputRef.current.value,
                ownerId: this.context.userId
            }
        }).then((res) => {
            this.modalInputRef.current.value=""
            this.closeModal()
            return res.data ? this.props.createBoardCard(res.data.createBoard) : null
        }).catch((err) => {
            this.setState({error: err})
        })
    }

    render() { 

        if (this.state.error) {
            throw this.state.error;
        }
        
        return (
            <div id="menu-container">
                <h1> Menu </h1>
                
                <p className="menu-items" onClick={this.openModal}>Add Board</p>
                <div className={"add-board-passepartout" + (this.state.modalIsOpen ? "" : " hidden")}> </div>
                <div className={"add-board-modal" + (this.state.modalIsOpen ? "" : " hidden")} ref={this.modalRef}>  {/*isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} */}
                    <form>
                        <input placeholder="Board name" ref={this.modalInputRef}/>
                        <button onClick={this.createBoard}>Create board</button>                       
                    </form>
                </div>
            </div>
        );
    }
}

export default withApollo(Menu);