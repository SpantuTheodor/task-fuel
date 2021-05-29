const graphql = require("graphql")
const {
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
} = graphql

const { GraphQLDateTime } = require('graphql-iso-date')
const Task = require('../../../models/task.js')
const TaskList = require('../../../models/taskList.js')
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
        taskListId: {
            type: new GraphQLNonNull(GraphQLID)
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
            taskListId: args.taskListId
        })

        await TaskList.updateOne({
            '_id': task.taskListId
        }, { $push: {taskIds: task.id }}, { upsert: true })

        return task.save()
    }
}

module.exports = { addTaskMutation }