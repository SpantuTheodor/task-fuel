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

const createBoardMutation = {
    type: BoardType,
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        ownerId: {
            type: new GraphQLNonNull(GraphQLID)
        }

    },
    async resolve(parent, args) {

        let board = new Board({
            name: args.name,
            ownerId: args.ownerId,
            userIds: [args.ownerId]
        })

        await User.updateOne({
            '_id': board.ownerId
        }, { $push: {boardIds: board.id }}, { upsert: true })

        return board.save();
    }
}

module.exports = { createBoardMutation}