const graphql = require("graphql");
const { GraphQLObjectType } = graphql;

const { taskQuery } = require('./queries/task')
const { userQuery } = require('./queries/user')
const { boardQuery } = require('./queries/board')
const { taskListQuery } = require("./queries/taskList")
const { logEntryQuery } = require('./queries/logEntry')

const { tasksQuery } = require('./queries/tasks')
const { usersQuery } = require('./queries/users')
const { boardsQuery } = require('./queries/boards')
const { taskListsQuery } = require("./queries/taskLists")
const { logEntriesQuery } = require('./queries/logEntries')

const { logEntriesByBoardIdQuery } = require('./queries/logEntriesByBoardId')
const { boardsByUserIdQuery } = require('./queries/boardsByUserId')
const { userByUsernameQuery } = require("./queries/userByUsername.js");

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {

        task: taskQuery,
        user: userQuery,
        board: boardQuery,
        taskList: taskListQuery,
        logEntry: logEntryQuery,

        tasks: tasksQuery,
        users: usersQuery,
        boards: boardsQuery,
        taskLists: taskListsQuery,
        logEntries: logEntriesQuery,
        
        logEntriesByBoardId: logEntriesByBoardIdQuery,
        boardsByUserId: boardsByUserIdQuery,
        userByUsername: userByUsernameQuery
    }
});

module.exports = RootQuery;