const graphql = require("graphql");
const { GraphQLID } = graphql;

const User = require('../../../models/user.js');
const { UserType } = require('../../objectTypes.js');

const userQuery = {
    type: UserType,
    args: {
        id: {
            type: GraphQLID
        }
    },
    resolve(parent, args, req) {

        if(!req.isAuthenticated){
            throw new Error('Unauthenticated')
        }
        
        return User.findById(args.id);
    }
}

module.exports = { userQuery }