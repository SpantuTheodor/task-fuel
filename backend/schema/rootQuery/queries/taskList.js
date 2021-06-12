const graphql = require("graphql");
const { GraphQLID } = graphql;

const TaskList = require('../../../models/taskList.js');
const { TaskListType } = require('../../objectTypes.js');

const taskListQuery = {
    type: TaskListType,
    args: {
        id: {
            type: GraphQLID
        }
    },
    resolve(parent, args, req) {

        if(!req.isAuthenticated){
            throw new Error('Unauthenticated')
        }
        
        return TaskList.findById(args.id);
    }
}

module.exports = { taskListQuery }