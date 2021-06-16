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
            taskLists {
                id
                name
                tasks {
                    id
                    name
                    assignee {
                        name
                    }
                    status
                    order
                }
            }
        }
    }
`

export default getBoardByIdQuery