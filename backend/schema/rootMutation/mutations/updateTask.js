const graphql = require("graphql")
const {
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
    GraphQLList
} = graphql

const { GraphQLDateTime } = require('graphql-iso-date')
const Task = require('../../../models/task.js')
const { TaskType } = require('../../objectTypes.js')
const _ = require('lodash');

const updateTaskMutation = {
    type: TaskType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        startDate: {
            type: GraphQLDateTime
        },
        endDate: {
            type: GraphQLDateTime
        },
        assigneeId: {
            type: GraphQLID
        },
        collaboratorIds: {
            type: new GraphQLList(GraphQLID)
        },
        location: {
            type: GraphQLString
        },
        status: {
            type: GraphQLString
        },
        resource: {
            type: GraphQLString
        }

    },
    async resolve(parent, args, req) {

        if(!req.isAuthenticated){
            throw new Error('Unauthenticated')
        }
        
        await Task.updateOne({
            '_id': args.id
        }, {$set:
            _.pickBy({
                name: args.name,
                description: args.description,
                startDate: args.startDate,
                endDate: args.endDate,
                assigneeId: args.assigneeId,
                collaboratorIds: args.collaboratorIds,
                location: args.location,
                status: args.status,
                resource: args.resource
            }, _.identity),
        }, { upsert: true })

    }
}

module.exports = { updateTaskMutation }