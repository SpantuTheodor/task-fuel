import { gql } from "apollo-boost"

const getBoardsByUserIdQuery = gql`
    query($id: ID!){
        boardsByUserId(id: $id){
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

export default getBoardsByUserIdQuery