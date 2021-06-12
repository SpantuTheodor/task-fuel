import "./BoardCard.css"

import deleteBoardMutation from "../../../../mutations/deleteBoardMutation"
import AuthenticationContext from '../../../../contexts/authenticationContext'
import xSymbol from '../../../../assets/x-icon.png'

import React, { Component } from 'react'
import { withApollo } from "react-apollo"

class BoardCard extends Component {
    constructor(props){
        super(props)
        this.state = {
            boardId: this.props.boardId,
            name: this.props.name,
            ownerName: this.props.owner.name,
            error: null
        }
        this.deleteBoard = this.deleteBoard.bind(this)
    }

    static contextType = AuthenticationContext

    deleteBoard(event){
        event.preventDefault()
        this.props.client.mutate({
            mutation: deleteBoardMutation,
            variables: {
                id: this.state.boardId
            }
        }).then((res) => {
            console.log(res)
            this.props.deleteBoardCard(this.state.boardId)
        }).catch((err) => {
            this.setState({error: err})
        })
    }

    render() { 
        
        if (this.state.error) {
            throw this.state.error;
        }

        return (
            <div className="board-card">
                <img src={xSymbol} onClick={this.deleteBoard} alt="delete board button" />
                <p> {this.props.name} </p>
                <p> {this.props.owner.name} </p>
            </div>
        )
    }
}

export default withApollo(BoardCard)