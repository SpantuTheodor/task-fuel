const graphql = require("graphql");
const {
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

const Board = require('../../../models/board');
const User = require('../../../models/user');
const TaskList = require('../../../models/taskList')
const { BoardType } = require('../../objectTypes');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const addBoardMutation = {
    type: BoardType,
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        ownerId: {
            type: new GraphQLNonNull(GraphQLID)
        },
        userIds: {
            type: new GraphQLList(GraphQLID)
        },
        taskListIds: {
            type: new GraphQLList(GraphQLID)
        },
        logEntryIds: {
            type: new GraphQLList(GraphQLID)
        }

    },
    async resolve(parent, args, req) {

        if(!req.isAuthenticated){
            throw new Error('Unauthenticated')
        }

        let newUserIds = [...new Set([args.ownerId].concat(args.userIds))]
        let board = new Board({
            name: args.name,
            ownerId: args.ownerId,
            userIds: newUserIds,
            taskListIds: args.taskListIds,
            logEntryIds: args.logEntryIds
        })

        await User.updateOne({
            '_id': board.ownerId
        }, { $push: {boardIds: board.id }}, { upsert: true })

        await TaskList.updateMany({
            '_id': { $in: board.taskListIds }
        }, { $set: {boardId: board.id }})

        return board.save();
    }
}

module.exports = { addBoardMutation}