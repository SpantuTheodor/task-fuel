const graphql = require("graphql")
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphql

const {
    GraphQLDateTime
} = require('graphql-iso-date')

const User = require('../models/user.js')
const Task = require('../models/task.js')
const Board = require('../models/board.js')
const TaskList = require('../models/taskList')
const LogEntry = require('../models/logEntry')

const TaskType = new GraphQLObjectType({
    name: "Task",
    fields: () => ({
        id: {
            type: GraphQLID
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
        assignee: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.assigneeId);
            }
        },
        collaborators: {
            type: UserType,
            resolve(parent, args) {
                return User.find({
                    '_id': {
                        $in: parent.collaboratorIds
                    }
                })
            }
        },
        taskList: {
            type: new GraphQLNonNull(TaskListType),
            resolve(parent, args) {
                return TaskList.findOne({
                    '_id': parent.taskListId
                })
            }
        }, 
        location: {
            type: GraphQLString
        },
        status: {
            type: new GraphQLNonNull(GraphQLString)
        }, 
        resource: {
            type: GraphQLString
        }
    }),
});

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        boards: {
            type: new GraphQLList(BoardType),
            resolve(parent, args) {
                return Board.find({
                    '_id': {
                        $in: parent.boardIds
                    }
                })
            }
        }
    })
})

const BoardType = new GraphQLObjectType({
    name: "Board",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        owner: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.ownerId);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            async resolve(parent, args) {
                return await User.find({
                    '_id': {
                        $in: parent.userIds
                    }
                });
            }
        },
        taskLists: {
            type: new GraphQLList(TaskListType),
            async resolve(parent, args){
                return await TaskList.find({
                    '_id': {
                        $in: parent.taskListIds
                    }
                }) 
            }
        },
        logEntries: {
            type: new GraphQLList(LogEntryType),
            async resolve(parent, args){
                return await LogEntry.find({
                    '_id': {
                        $in: parent.logEntryIds
                    }
                }) 
            }
        }

    })
})

const TaskListType = new GraphQLObjectType({
    name: "TaskList",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        board: {
            type: BoardType,
            resolve(parent, args){
                return Board.findById(parent.boardId);
            }
        },
        tasks: {
            type: new GraphQLList(TaskType),
            async resolve(parent, args) {
                return await Task.find({
                    '_id': {
                        $in: parent.taskIds
                    }
                });
            }
        }
    })
})

const AuthenticationType = new GraphQLObjectType({
    name: "Authentication",
    fields: () => ({
        userId: {
            type: GraphQLID
        },
        username: {
            type: GraphQLString
        },
        accessToken: {
            type: GraphQLString
        },
        refreshToken: {
            type: GraphQLString
        }
    })
})

const LogEntryType = new GraphQLObjectType({
    name: "LogEntry",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        method: {
            type: new GraphQLNonNull(GraphQLString)
        },
        board: {
            type: BoardType,
            resolve(parent, args){
                return Board.findById(parent.boardId);
            }
        },
        task: {
            type: TaskType,
            resolve(parent, args){
                return Task.findById(parent.taskId);
            }
        },
        date: {
            type: new GraphQLNonNull(GraphQLDateTime)
        }
    })
})

module.exports = {
    TaskType,
    UserType,
    BoardType,
    TaskListType,
    AuthenticationType,
    LogEntryType
};