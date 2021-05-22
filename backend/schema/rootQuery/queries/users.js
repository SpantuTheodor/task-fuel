const graphql = require("graphql");
const { GraphQLList } = graphql;

const User = require('../../../models/user.js');
const { UserType } = require('../../objectTypes.js');

const usersQuery = {
    type: new GraphQLList(UserType),
    resolve(parent, args) {
        return User.find({});
    }
}

module.exports = { usersQuery }