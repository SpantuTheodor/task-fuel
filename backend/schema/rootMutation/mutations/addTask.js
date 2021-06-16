const graphql = require("graphql")
const {
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = graphql

const { GraphQLDateTime } = require('graphql-iso-date')
const Task = require('../../../models/task.js')
const TaskList = require('../../../models/taskList.js')
const LogEntry = require('../../../models/logEntry.js')
const Board = require('../../../models/board.js')
const { TaskType } = require('../../objectTypes.js')

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
        taskListId: {
            type: new GraphQLNonNull(GraphQLID)
        },
        location: {
            type: GraphQLString
        },
        status: {
            type: new GraphQLNonNull(GraphQLString)
        },
        resource: {
            type: GraphQLString
        },
        order: {
            type: new GraphQLNonNull(GraphQLInt)
        }

    },
    async resolve(parent, args, req) {

        if(!req.isAuthenticated){
            throw new Error('Unauthenticated')
        }

        let task = new Task({
            name: args.name,
            description: args.description,
            startDate: args.startDate,
            endDate: args.endDate,
            assigneeId: args.assigneeId,
            collaboratorIds: args.collaboratorIds,
            taskListId: args.taskListId,
            location: args.location,
            status: args.status,
            resource: args.resource,
            order: args.order
        })

        await TaskList.updateOne({
            '_id': task.taskListId
        }, { $push: {taskIds: task.id }}, { upsert: true })

        TaskList.findById(args.taskListId).select("boardId").then(async (res) => {
            
            let logEntry = new LogEntry({
                method: "created",
                boardId: res.boardId,
                taskName: task.name,
                date: new Date()
            })

            logEntry.save()

            await Board.updateOne({
                '_id': res.boardId
            }, { $push: {logEntryIds: logEntry.id }}, { upsert: true })

        });

        return task.save()
    }
}

module.exports = { addTaskMutation }