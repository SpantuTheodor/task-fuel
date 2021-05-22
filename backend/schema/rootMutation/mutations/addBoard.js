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
        taskIds: {
            type: new GraphQLList(GraphQLID)
        },
        taskCategories: {
            type: new GraphQLList(GraphQLString)
        }

    },
    resolve(parent, args) {
        let board = new Board({
            name: args.name,
            ownerId: args.ownerId,
            userIds: args.userIds,
            taskIds: args.taskIds,
            taskCategories: args.taskCategories
        })
        return board.save();
    }
}

module.exports = { addBoardMutation}