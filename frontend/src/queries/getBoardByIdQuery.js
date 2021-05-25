import { gql } from "apollo-boost"

const getBoardByIdQuery = gql`
    query($id: ID!){
        board(id: $id){
            id
            name
            owner {
                id
                name
            }
            users { 
                id
                name
            }
            tasks {
                id
                name
                description
                assignee {
                    id
                    name
                }
            }
        }
    }
`

export default getBoardByIdQuery