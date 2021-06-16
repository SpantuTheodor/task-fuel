import { gql } from "apollo-boost"

const updateTaskListMutation = gql`
    mutation($id: ID!, $taskIds: [ID]!) {
        updateTaskList(id: $id, taskIds: $taskIds)
    }
`

export default updateTaskListMutation