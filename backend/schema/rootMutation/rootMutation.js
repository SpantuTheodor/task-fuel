const graphql = require("graphql");
const { GraphQLObjectType } = graphql;

const { addTaskMutation } = require('./mutations/addTask')
const { addUserMutation } = require('./mutations/addUser')
const { addBoardMutation } = require('./mutations/addBoard')
const { signUpMutation } = require('./mutations/signUp')
const { logInMutation } = require('./mutations/logIn')
const { addTaskListMutation } = require("./mutations/addTaskList")
const { createBoardMutation } = require("./mutations/createBoard")
const { deleteBoardMutation } = require("./mutations/deleteBoard")
const { deleteTaskListMutation } = require("./mutations/deleteTaskList")
const { deleteTaskMutation } = require("./mutations/deleteTask")

const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        addTask: addTaskMutation,
        addUser: addUserMutation,
        addBoard: addBoardMutation,
        createBoard: createBoardMutation,
        deleteBoard: deleteBoardMutation,
        deleteTaskList: deleteTaskListMutation,
        deleteTask: deleteTaskMutation,
        addTaskList: addTaskListMutation,
        signUp: signUpMutation,
        logIn: logInMutation,
    }
})

module.exports = RootMutation;