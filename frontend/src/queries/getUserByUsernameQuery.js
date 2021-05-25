import { gql } from "apollo-boost"

const getUserByUsernameQuery = gql`
query($username: String!){
    userByUsername(name: $username){
        id
    }
}
`

export default getUserByUsernameQuery