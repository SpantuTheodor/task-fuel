const graphql = require("graphql");
const {
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

const TaskList = require('../../../models/taskList');
const Board = require('../../../models/board')
const { TaskListType } = require('../../objectTypes');

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
    async resolve(parent, args, req) {

        if(!req.isAuthenticated){
            throw new Error('Unauthenticated')
        }
        
        let taskList = new TaskList({
            name: args.name,
            boardId: args.boardId,
            taskIds: args.taskIds
        })
    
        await Board.updateOne({
            '_id': taskList.boardId
        }, { $push: {taskListIds: taskList.id }}, { upsert: true })

        return taskList.save();
    }
}

module.exports = { addTaskListMutation}