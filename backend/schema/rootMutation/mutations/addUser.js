const graphql = require("graphql");
const {
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

const User = require('../../../models/user.js');
const { UserType } = require('../../objectTypes.js');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const addUserMutation = {
    type: UserType,
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            type: new GraphQLNonNull(GraphQLString)
        },
        boardIds: {
            type: new GraphQLList(GraphQLID)
        }
    },
    resolve(parent, args) {
        let user = new User({
            name: args.name,
            password: args.password,
            boardIds: args.boardIds
        });
        return user.save();
    }
}

module.exports = { addUserMutation }