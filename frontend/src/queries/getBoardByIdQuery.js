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
                name
                tasks {
                    id
                    name
                    assignee {
                        name
                    }
                }
            }
        }
    }
`

export default getBoardByIdQuery