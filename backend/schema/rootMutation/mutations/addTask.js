const graphql = require("graphql");
const {
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

const { GraphQLDateTime } = require('graphql-iso-date');
const Task = require('../../../models/task.js');
const { TaskType } = require('../../objectTypes.js');

const addTaskMutation = {
    type: TaskType,
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        description: {
            type: GraphQLString
        },
        startDate: {
            type: new GraphQLNonNull(GraphQLDateTime)
        },
        endDate: {
            type: new GraphQLNonNull(GraphQLDateTime)
        },
        assigneeId: {
            type: new GraphQLNonNull(GraphQLID)
        },
        collaboratorIds: {
            type: new GraphQLList(GraphQLID)
        },
        boardId: {
            type: new GraphQLNonNull(GraphQLID)
        },
        category: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve(parent, args, req) {

        if(!req.isAuthenticated){
            throw new Error('Unauthenticated');
        }

        let task = new Task({
            name: args.name,
            description: args.description,
            startDate: args.startDate,
            endDate: args.endDate,
            assigneeId: args.assigneeId,
            collaboratorIds: args.collaboratorIds,
            boardId: args.boardId,
            category: args.category
        });
        return task.save();
    }
}

module.exports = { addTaskMutation }