import { gql } from "apollo-boost"

const deleteTaskMutation = gql`
    mutation($id: ID!) {
        deleteTask(id: $id)
    }
`

export default deleteTaskMutation