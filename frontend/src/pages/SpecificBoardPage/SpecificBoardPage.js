import NavBar from '../../shared/components/Navbar/Navbar'
import Collaborators from './components/Collaborators/Collaborators'
import TasksGrid from './components/TasksGrid/TasksGrid'
import getBoardByIdQuery from '../../queries/getBoardByIdQuery'

import React, { Component } from 'react';
import { withApollo } from "react-apollo";

class SpecificBoardPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: props.match.params.username,
            boardId: props.match.params.boardId,
            boardObject: null,
        }
        this.getBoardById = this.getBoardById.bind(this)
    }

    componentDidMount() {
        this.getBoardById()
    }

    componentDidUpdate(){
        if(this.state.boardObject != null){
            document.title = `${this.state.boardObject.name} | task-fuel`
        }
    }

    getBoardById(){

        this.props.client.query({
            query: getBoardByIdQuery,
            variables: {
                id: this.state.boardId
            }
        }).then((res) => {
            this.setState({boardObject: res.data.board})
        })

    }

    render() {
        console.log(this.state.boardObject)
        return (
            <div>
                <NavBar />
                <Collaborators boardObject={this.state.boardObject} />
                <TasksGrid boardObject={this.state.boardObject} />
            </div>
        );
    }
}

export default withApollo(SpecificBoardPage);