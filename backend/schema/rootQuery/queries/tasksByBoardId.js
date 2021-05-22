const graphql = require("graphql");
const {
    GraphQLID,
    GraphQLList,
} = graphql;

const Task = require('../../../models/task.js');
const { TaskType } = require('../../objectTypes.js');

const tasksByBoardIdQuery ={
    type: new GraphQLList(TaskType),
    args: {
        id: {
            type: GraphQLID
        }
    },
    resolve(parent, args) {
        return Task.find({'boardId': args.id});            
    }
}

module.exports = { tasksByBoardIdQuery }