import { gql } from "apollo-boost"

const deleteTaskListMutation = gql`
    mutation($id: ID!) {
        deleteTaskList(id: $id)
    }
`

export default deleteTaskListMutation