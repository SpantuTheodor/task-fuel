const graphql = require("graphql");
const { GraphQLList } = graphql;

const Task = require('../../../models/task.js');
const { TaskType } = require('../../objectTypes.js');

const tasksQuery = {
    type: new GraphQLList(TaskType),
    resolve(parent, args) {
        return Task.find({});
    }
}

module.exports = { tasksQuery }