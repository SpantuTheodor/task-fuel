import { gql } from "apollo-boost"

const getTaskByIdQuery = gql`
    query($id: ID!){
        task(id: $id){
            id
            name
            description
            assignee {
                id
                name
            }
            collaborators {
                id
                name
            }
            startDate
            endDate
        }
    }
`

export default getTaskByIdQuery