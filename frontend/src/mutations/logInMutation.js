import { gql } from "apollo-boost"

const logInMutation = gql`
    mutation($name: String!, $password: String!){
        logIn(name: $name, password: $password){
            userId
            username
            accessToken
        }
    }
`

export default logInMutation