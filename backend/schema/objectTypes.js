const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
} = graphql;

const {
    GraphQLDate,
    GraphQLTime,
    GraphQLDateTime
} = require('graphql-iso-date');

const User = require('../models/user.js');
const Task = require('../models/task.js');
const Board = require('../models/board.js');

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

module.exports = {
    TaskType,
    UserType,
    BoardType
};