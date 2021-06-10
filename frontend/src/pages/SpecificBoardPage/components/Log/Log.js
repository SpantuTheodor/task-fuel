import "./Log.css"

import getLogEntriesByBoardIdQuery from "../../../../queries/getLogEntriesByBoardIdQuery"

import React, { Component } from 'react';
import { withApollo } from "react-apollo"

class Log extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boardId: this.props.boardId,
            logEntries: null
        }
        this.sub = null
    }

    
    componentDidMount(){
        this.getLogEntriesByBoardId()
    }

    getLogEntriesByBoardId(){
        console.log(this.state.boardId)
        this.sub = this.props.client.watchQuery({
            query: getLogEntriesByBoardIdQuery,
            variables: {
                id: this.state.boardId
            },
            fetchPolicy: 'no-cache',
            pollInterval: 10000
        }).subscribe({
            next: ({ data }) => { this.setState({logEntries: data.board.logEntries}) },
            error: (e) => console.error(e)
        })
    }

    componentWillUnmount(){
        this.sub.unsubscribe()
    }

    render() { 
        return (
            <div>
                <h1> Log </h1>
                {this.state.logEntries ? Array.from(this.state.logEntries).reverse().slice(0, 10).map((logEntry) => {
                    return(
                        <p className="log-entry-p" key={logEntry.id}> {logEntry.task.name} <span className="log-entry-span">{logEntry.method}</span> {logEntry.date.slice(0, 19).replace(/-/g, "/").replace("T", " - ")} </p>
                    )
                }) : <p> There is nothing to display at the moment</p>}
            </div>
        );
    }
}

export default withApollo(Log);