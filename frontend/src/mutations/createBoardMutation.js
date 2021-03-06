import { gql } from "apollo-boost"

const createBoardMutation = gql`
    mutation($name: String!, $ownerId: ID!) {
        createBoard(name: $name, ownerId: $ownerId){
            id
            name
            users {
                name
            }
            taskLists {
                name
            }
            owner {
                name
            }
        }
    }
`

export default createBoardMutation