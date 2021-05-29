import "./BoardCard.css"

import deleteBoardMutation from "../../../../mutations/deleteBoardMutation"
import xSymbol from '../../../../assets/x-icon.png'

import React, { Component } from 'react'
import { withApollo } from "react-apollo"

class BoardCard extends Component {
    constructor(props){
        super(props)
        this.state = {
            boardId: this.props.boardId,
            name: this.props.name,
            ownerName: this.props.owner.name
        }
        this.deleteBoard = this.deleteBoard.bind(this)
    }

    deleteBoard(event){
        event.preventDefault()
        this.props.client.mutate({
            mutation: deleteBoardMutation,
            variables: {
                id: this.state.boardId
            }
        }).then((res) => {
            console.log(res)
        })
    }

    render() { 
        return (
            <div className="board-card">
                <img src={xSymbol} onClick={this.deleteBoard} />
                <p> {this.props.name} </p>
                <p> {this.props.owner.name} </p>
            </div>
        )
    }
}

export default withApollo(BoardCard)