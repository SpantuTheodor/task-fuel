const graphql = require("graphql");
const { GraphQLList } = graphql;

const TaskList = require('../../../models/taskList.js');
const { TaskListType } = require('../../objectTypes.js');

const taskListsQuery = {
    type: new GraphQLList(TaskListType),
    resolve(parent, args, req) {

        if(!req.isAuthenticated){
            throw new Error('Unauthenticated')
        }
        
        return TaskList.find({});
    }
}

module.exports = { taskListsQuery }