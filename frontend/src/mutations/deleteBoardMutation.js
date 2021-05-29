import { gql } from "apollo-boost"

const deleteBoardMutation = gql`
    mutation($id: ID!) {
        deleteBoard(id: $id)
    }
`

export default deleteBoardMutation