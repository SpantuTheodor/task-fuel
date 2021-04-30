const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

const {
    GraphQLDate,
    GraphQLTime,
    GraphQLDateTime
} = require('graphql-iso-date');

const User = require('../models/user.js');
const Task = require('../models/task.js');
const Board = require('../models/board.js')
const {
    TaskType,
    UserType,
    BoardType
} = require('./objectTypes.js');

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addTask: {
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
                }
            },
            resolve(parent, args) {
                let task = new Task({
                    name: args.name,
                    description: args.description,
                    startDate: args.startDate,
                    endDate: args.endDate,
                    assigneeId: args.assigneeId,
                    collaboratorIds: args.collaboratorIds
                });
                return task.save();
            }
        },

        addUser: {
            type: UserType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                password: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                taskIds: {
                    type: new GraphQLList(GraphQLID)
                },
                boardIds: {
                    type: new GraphQLList(GraphQLID)
                }
            },
            resolve(parent, args) {
                let user = new User({
                    name: args.name,
                    password: args.password,
                    boardIds: args.boardIds
                });
                return user.save();
            }
        },

        addBoard: {
            type: BoardType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                ownerId: {
                    type: new GraphQLNonNull(GraphQLID)
                },
                userIds: {
                    type: new GraphQLList(GraphQLID)
                },
                taskIds: {
                    type: new GraphQLList(GraphQLID)
                }

            },
            resolve(parent, args) {
                let board = new Board({
                    name: args.name,
                    ownerId: args.ownerId,
                    userIds: args.userIds,
                    taskIds: args.taskIds
                })
                return board.save();
            }
        }
    }
})

module.exports = Mutation;