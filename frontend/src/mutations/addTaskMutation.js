import { gql } from "apollo-boost"

const addTaskMutation = gql`
    mutation($name: String!, $description: String, $startDate: DateTime!, $endDate: DateTime!, $assigneeId: ID, $collaboratorIds: [ID], $taskListId: ID!) {
        addTask(name: $name, description: $description, startDate: $startDate, endDate: $endDate, assigneeId: $assigneeId, collaboratorIds: $collaboratorIds, taskListId: $taskListId){
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
        }
    }
`

export default addTaskMutation