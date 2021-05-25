import { gql } from "apollo-boost"

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
`

export default getTasksByBoardIdQuery