import { gql } from "apollo-boost"

const addUserToBoardMutation = gql`
    mutation($boardId: ID!, $userName: String!) {
        addUserToBoard(boardId: $boardId, userName:$userName){
            name
        }
    }
`

export default addUserToBoardMutation