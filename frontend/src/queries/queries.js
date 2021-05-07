import { gql } from "apollo-boost";

const getTasksQuery = gql`
    {
        tasks{
            id
            name
            description
        }
    }
`;

const getBoardsByUserIdQuery = gql`
    query($id: ID!){
        boardsByUserId(id: $id){
            id
            name
        }
    }
`;

const addTaskMutation = gql`
    mutation($name: String!, $description: String, $startDate: DateTime!, $endDate: DateTime!, $assigneeId: ID!, $collaboratorIds: [ID]) {
        addTask(name: $name, description: $description, startDate: $startDate, endDate: $endDate, assigneeId: $assigneeId, collaboratorIds: $collaboratorIds){
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
`;

const logInMutation = gql`
    mutation($name: String!, $password: String!){
        logIn(name: $name, password: $password){
            userId
            accessToken
        }
    }
`;

export { getTasksQuery, getBoardsByUserIdQuery, addTaskMutation, logInMutation }