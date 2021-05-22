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
    resolve(parent, args) {
        return Task.findById(args.id);
    }
}

module.exports = { taskQuery }