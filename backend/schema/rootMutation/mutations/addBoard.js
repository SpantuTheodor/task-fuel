const graphql = require("graphql");
const {
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

const Board = require('../../../models/board.js');
const { BoardType } = require('../../objectTypes.js');

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
        }

    },
    resolve(parent, args) {
        let board = new Board({
            name: args.name,
            ownerId: args.ownerId,
            userIds: args.userIds,
            taskLists: args.taskListIds
        })
        return board.save();
    }
}

module.exports = { addBoardMutation}