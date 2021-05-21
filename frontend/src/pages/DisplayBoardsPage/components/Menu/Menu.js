import "./Menu.css";

import AuthenticationContext from "../../../../contexts/authenticationContext"

import React, { Component } from 'react';
import ReactModal from 'react-modal';

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
        this.state = {
            modalIsOpen: false
        }
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    static contextType = AuthenticationContext

    openModal(){
        this.setState({modalIsOpen: true})
    }

    closeModal(){
        this.setState({modalIsOpen: false})
    }

    render() { 
        return (
            <div id="menu-container">
                <h1> Menu </h1>
                
                <p className="menu-items" onClick={this.openModal}>Add Board</p>

                    <ReactModal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    >

                    <form>
                        <input placeholder="Board name"/>
                        <button onClick={this.closeModal}>Close</button>                       
                    </form>
                </ReactModal>

            </div>
        );
    }
}

export default Menu;