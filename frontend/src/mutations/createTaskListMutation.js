import { gql } from "apollo-boost"

const addTaskListMutation = gql`
    mutation($name: String!, $boardId: ID!, $taskIds:[ID]) {
        addTaskList(name: $name, boardId: $boardId, taskIds: $taskIds){
            id
            name
            board {
                name
            }
            tasks {
            id
            name
            }
        }
    }
`

export default addTaskListMutation