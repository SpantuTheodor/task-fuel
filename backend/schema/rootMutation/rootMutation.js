const graphql = require("graphql");
const { GraphQLObjectType } = graphql;

const { addTaskMutation } = require('./mutations/addTask')
const { addUserMutation } = require('./mutations/addUser')
const { addBoardMutation } = require('./mutations/addBoard')
const { addTaskListMutation } = require("./mutations/addTaskList")
const { addUserToBoardMutation } = require("./mutations/addUserToBoard");
const { signUpMutation } = require('./mutations/signUp')
const { logInMutation } = require('./mutations/logIn')
const { createBoardMutation } = require("./mutations/createBoard")
const { deleteBoardMutation } = require("./mutations/deleteBoard")
const { deleteTaskListMutation } = require("./mutations/deleteTaskList")
const { deleteTaskMutation } = require("./mutations/deleteTask")
const { updateTaskMutation } = require("./mutations/updateTask");

const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        addTask: addTaskMutation,
        addUser: addUserMutation,
        addBoard: addBoardMutation,
        addTaskList: addTaskListMutation,
        addUserToBoard: addUserToBoardMutation,
        createBoard: createBoardMutation,
        deleteBoard: deleteBoardMutation,
        deleteTaskList: deleteTaskListMutation,
        deleteTask: deleteTaskMutation,
        updateTask: updateTaskMutation,
        signUp: signUpMutation,
        logIn: logInMutation,
    }
})

module.exports = RootMutation;