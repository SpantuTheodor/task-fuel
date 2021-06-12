const graphql = require("graphql");
const { GraphQLList } = graphql;

const Task = require('../../../models/task.js');
const { TaskType } = require('../../objectTypes.js');

const tasksQuery = {
    type: new GraphQLList(TaskType),
    resolve(parent, args, req) {

        if(!req.isAuthenticated){
            throw new Error('Unauthenticated')
        }
        
        return Task.find({});
    }
}

module.exports = { tasksQuery }