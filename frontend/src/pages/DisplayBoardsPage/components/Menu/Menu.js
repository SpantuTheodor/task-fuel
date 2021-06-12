import "./Menu.css";

import AuthenticationContext from "../../../../contexts/authenticationContext"
import createBoardMutation from "../../../../mutations/createBoardMutation"

import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { withApollo } from "react-apollo";

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

class Menu extends Component {
    constructor(props) {
        super(props);
        this.modalRef = React.createRef();
        this.state = {
            modalIsOpen: false,
            error: null
        }
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.createBoard = this.createBoard.bind(this)
    }

    static contextType = AuthenticationContext

    openModal(){
        this.setState({modalIsOpen: true})
    }

    closeModal(){
        this.setState({modalIsOpen: false})
    }

    createBoard(event){
        event.preventDefault()
        this.props.client.mutate({
            mutation: createBoardMutation,
            variables: {
                name: this.modalRef.current.value,
                ownerId: this.context.userId
            }
        }).then((res) => {
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

                    <ReactModal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Create Board"
                    >

                    <form>
                        <input placeholder="Board name" ref={this.modalRef}/>
                        <button onClick={this.createBoard}>Create board</button>                       
                    </form>
                </ReactModal>

            </div>
        );
    }
}

export default withApollo(Menu);