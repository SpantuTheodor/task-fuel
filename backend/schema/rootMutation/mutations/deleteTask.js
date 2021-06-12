const graphql = require("graphql");
const {
    GraphQLID,
    GraphQLNonNull,
    GraphQLBoolean
} = graphql;

const Task = require('../../../models/task');
const TaskList = require('../../../models/taskList');
const LogEntry = require('../../../models/logEntry');
const Board = require('../../../models/board');


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const deleteTaskMutation = {
    type: GraphQLBoolean,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    async resolve(parent, args, req) {

        if(!req.isAuthenticated){
            throw new Error('Unauthenticated')
        }

        Task.findById(args.id).select("name taskListId").then(async (taskResult) => {
            await TaskList.findById(taskResult.taskListId).select("boardId").then(async (taskListResult) => {
            
                let logEntry = new LogEntry({
                    method: "deleted",
                    boardId: taskListResult.boardId,
                    taskName: taskResult.name,
                    date: new Date()
                })
    
                logEntry.save()
    
                await Board.updateOne({
                    '_id': taskListResult.boardId
                }, { $push: {logEntryIds: logEntry.id }}, { upsert: true })
    
            });
        })


        Task.deleteOne({ '_id': args.id }).then(function(){
            return true
        }).catch(function(error){
            return false
        });
    }
}

module.exports = { deleteTaskMutation}