const graphql = require("graphql");
const { GraphQLString } = graphql;

const User = require('../../../models/user.js');
const { UserType } = require('../../objectTypes.js');

const userByUsernameQuery = {
    type: UserType,
    args: {
        name: {
            type: GraphQLString
        }
    },
    resolve(parent, args) {
        return User.findOne({'name': args.name});
    }
}

module.exports = { userByUsernameQuery }