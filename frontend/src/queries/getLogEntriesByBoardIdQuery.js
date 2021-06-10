import { gql } from "apollo-boost"

const getBoardByIdQuery = gql`
    query($id: ID!){
        board(id: $id){
            logEntries {
                id
                method
                task {
                    id
                    name
                }
                date
            }
        }
    }
`

export default getBoardByIdQuery