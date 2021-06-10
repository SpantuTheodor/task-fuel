import { gql } from "apollo-boost"

const updateTaskMutation = gql`
    mutation($id: ID!, $boardId: ID!, $taskId: ID!, $name: String, $description: String, $startDate: DateTime, $endDate: DateTime, $assigneeId: ID, $collaboratorIds: [ID], $location: String, $status: String, $resource: String) {
        updateTask(id: $id, boardId: $boardId, taskId: $taskId, name: $name, description: $description, startDate: $startDate, endDate: $endDate, assigneeId: $assigneeId, collaboratorIds: $collaboratorIds, location: $location, status: $status, resource: $resource){
            id
            name
            startDate
            endDate
            assignee {
                id
                name
            }
            collaborators {
                id
                name
            }
            location
            status
            resource
        }
    }
`

export default updateTaskMutation