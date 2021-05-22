const graphql = require("graphql");
const { GraphQLObjectType } = graphql;

const { taskQuery } = require('./queries/task')
const { userQuery } = require('./queries/user')
const { boardQuery } = require('./queries/board')
const { tasksQuery } = require('./queries/tasks')
const { usersQuery } = require('./queries/users')
const { boardsQuery } = require('./queries/boards')
const { boardsByUserIdQuery } = require('./queries/boardsByUserId')
const { tasksByBoardIdQuery } = require('./queries/tasksByBoardId');
const { userByUsernameQuery } = require("./queries/userByUsername.js");

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {

        task: taskQuery,
        user: userQuery,
        board: boardQuery,
        tasks: tasksQuery,
        users: usersQuery,
        boards: boardsQuery,
        boardsByUserId: boardsByUserIdQuery,
        tasksByBoardId: tasksByBoardIdQuery,
        userByUsername: userByUsernameQuery
    }
});

module.exports = RootQuery;