const graphql = require("graphql");
const {
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

const TaskList = require('../../../models/taskList.js');
const { TaskListType } = require('../../objectTypes.js');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const addTaskListMutation = {
    type: TaskListType,
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        boardId: {
            type: new GraphQLNonNull(GraphQLID)
        },
        taskIds: {
            type: new GraphQLList(GraphQLID)
        }

    },
    resolve(parent, args) {
        let taskList = new TaskList({
            name: args.name,
            boardId: args.boardId,
            taskIds: args.taskIds
        })
        return taskList.save();
    }
}

module.exports = { addTaskListMutation}