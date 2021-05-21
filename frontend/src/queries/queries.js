import { gql } from "apollo-boost";

const getBoardsByUserIdQuery = gql`
    query($id: ID!){
        boardsByUserId(id: $id){
            id
            name
            users {
                name
            }
            tasks {
                name
            }
            owner {
                name
            }
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
            username
            accessToken
        }
    }
`;

const getUserByUsernameQuery = gql`
    query($username: String!){
        userByUsername(name: $username){
            id
        }
    }
`;

const getTasksByBoardIdQuery = gql`
    query($id: ID!){
        tasksByBoardId(id: $id){
            id
            name
            description
            board {
                id
            }
            assignee {
                id
                name
            }
        }
    }
`;

export { getTasksByBoardIdQuery, getBoardsByUserIdQuery, getUserByUsernameQuery, addTaskMutation, logInMutation }