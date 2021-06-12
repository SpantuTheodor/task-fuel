const graphql = require("graphql");
const { GraphQLList } = graphql;

const User = require('../../../models/user.js');
const { UserType } = require('../../objectTypes.js');

const usersQuery = {
    type: new GraphQLList(UserType),
    resolve(parent, args, req) {

        if(!req.isAuthenticated){
            throw new Error('Unauthenticated')
        }
        
        return User.find({});
    }
}

module.exports = { usersQuery }