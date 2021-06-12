import { gql } from "apollo-boost"

const getBoardByIdQuery = gql`
    query($id: ID!){
        board(id: $id){
            logEntries {
                id
                method
                taskName
                date
            }
        }
    }
`

export default getBoardByIdQuery