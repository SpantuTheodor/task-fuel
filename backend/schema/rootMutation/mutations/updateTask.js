const graphql = require("graphql")
const {
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
    GraphQLList
} = graphql

const { GraphQLDateTime } = require('graphql-iso-date')
const _ = require('lodash');

const Task = require('../../../models/task.js')
const LogEntry = require('../../../models/logEntry.js')
const Board = require('../../../models/board.js')

const { TaskType } = require('../../objectTypes.js');

const updateTaskMutation = {
    type: TaskType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        boardId: {
            type: new GraphQLNonNull(GraphQLID)
        },
        taskId: {
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
        
        if(args.status){
            let logEntry = new LogEntry({
                method: args.status,
                boardId: args.boardId,
                taskId: args.id,
                date: new Date()
            })

            logEntry.save()

            await Board.updateOne({
                '_id': args.boardId
            }, { $push: {logEntryIds: logEntry.id }}, { upsert: true })
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