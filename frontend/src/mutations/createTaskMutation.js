import { gql } from "apollo-boost"

const createTaskMutation = gql`
    mutation($name: String!, $description: String, $startDate: DateTime, $endDate: DateTime, $assigneeId: ID, $collaboratorIds: [ID], $taskListId: ID!, $location: String, $status: String!, $resource: String) {
        addTask(name: $name, description: $description, startDate: $startDate, endDate: $endDate, assigneeId: $assigneeId, collaboratorIds: $collaboratorIds, taskListId: $taskListId, location: $location, status: $status, resource: $resource){
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

export default createTaskMutation