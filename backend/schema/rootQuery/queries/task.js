const graphql = require("graphql");
const { GraphQLID } = graphql;

const Task = require('../../../models/task.js');
const { TaskType } = require('../../objectTypes.js');

const taskQuery = {
    type: TaskType,
    args: {
        id: {
            type: GraphQLID
        }
    },
    resolve(parent, args, req) {

        if(!req.isAuthenticated){
            throw new Error('Unauthenticated')
        }
        
        return Task.findById(args.id);
    }
}

module.exports = { taskQuery }