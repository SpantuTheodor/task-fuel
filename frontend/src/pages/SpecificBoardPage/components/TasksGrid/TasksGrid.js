import "./TasksGrid.css"

import { getTasksByBoardIdQuery } from "../../../../queries/queries"
import TaskCard from "../TaskCard/TaskCard"

import React, { Component } from "react"
import { withApollo } from "react-apollo"



class TasksGrid extends Component {

    constructor(props){
        super(props)
        this.state = {
            tasks: []
        }
        this.getTasksByBoardId = this.getTasksByBoardId.bind(this)
    }

    componentDidMount(){
        document.title = "boards | task-fuel"
        this.getTasksByBoardId()
    }

    getTasksByBoardId(){
        console.log(this.props.boardId)
        this.props.client.query({
            query: getTasksByBoardIdQuery,
            variables: {
                id: this.props.boardId
            }
        }).then((res) => {
            console.log(res)
            let newTasks = []
            res.data.tasksByBoardId.map(task => {
                newTasks.push({
                    id:   task.id,
                    name: task.name,
                    description: task.description,
                    assignee: task.assignee
                })
            })
            this.setState({tasks: [...this.state.tasks].concat(newTasks) })
            console.log(this.state.tasks)
        })
    }

    render(){
        return (
                    <div className="task-cards-container">
                        {
                            this.state.boards === [] ? <p> No tasks to display </p> : this.state.tasks.map(task => {
                                return(
                                    <TaskCard key={task.id} name={task.name} description={task.description} assignee={task.assignee} />
                                )
                            })
                        }
                    </div>
        );
    }
}

export default withApollo(TasksGrid);
