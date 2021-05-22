const graphql = require("graphql");
const { GraphQLObjectType } = graphql;

const { addTaskMutation } = require('./mutations/addTask')
const { addUserMutation } = require('./mutations/addUser')
const { addBoardMutation } = require('./mutations/addBoard')
const { signUpMutation } = require('./mutations/signUp')
const { logInMutation } = require('./mutations/logIn')

const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        addTask: addTaskMutation,
        addUser: addUserMutation,
        addBoard: addBoardMutation,
        signUp: signUpMutation,
        logIn: logInMutation
    }
})

module.exports = RootMutation;