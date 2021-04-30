import React, { Component } from "react"
import { graphql } from "react-apollo";
import { getBoardsByUserIdQuery, getTasksQuery } from '../../queries/queries.js';
import {flowRight as compose} from 'lodash';
import "./TaskGrid.css";


class TaskGrid extends Component {
    
    displayAllTasks(){
        var data = this.props.getTasksQuery;
        if(data.loading){
            return(
                <div>
                    Loading...
                </div>
            )
        } else {
            return data.tasks.map(task => {
                return(
                    <li id={task.id} > {task.name} </li>
                )
            })
        }
    }
    
        
    displayBoardsByUserId(){
        var data = this.props.getBoardsByUserIdQuery;
        console.log("data =", data);
        if(data.loading){
            return(
                <div>
                    Loading...
                </div>
            )
        } else {
            return data.boardsByUserId.map(task => {
                return(
                    <li id={task.id} > {task.name} </li>
                )
            })
        }
    }

    render(){
        console.log(this.props);
        return (
            <div>
                <ul>
                    { this.displayAllTasks() }
                </ul>
                <ul>
                    { this.displayBoardsByUserId() }
                </ul>
            </div>
            
        );
    }
}

export default compose(
    graphql(getTasksQuery, {name: "getTasksQuery"}),
    graphql(getBoardsByUserIdQuery, {
        name: "getBoardsByUserIdQuery",
        options: (props) => {
            return {
                variables: {
                    id: "60854bdd09627f692050afbd"
                }
            }
        }
})
)(TaskGrid);
