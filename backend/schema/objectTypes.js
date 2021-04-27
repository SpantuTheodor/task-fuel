const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
} = graphql;

const User = require('../models/user.js');
const Task = require('../models/task.js');


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
        assignee: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.assigneeId);
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
        tasks: {
            type: new GraphQLList(TaskType),
            resolve(parent, args) {
                return Task.find({
                    assigneeId: parent.id
                });
            }
        },
        boards: {
            type: new GraphQLList(BoardType),
            resolve(parent, args) {
                return Board.find({'_id': { $in: parent.userIds}})
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
                console.log(parent)
                return User.findById(parent.ownerId);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            async resolve(parent, args) {
                return await User.find({'_id': { $in: parent.userIds}});
            }
        },
        tasks: {
            type: new GraphQLList(TaskType),
            async resolve(parent, args) {
                return await Task.find({'_id': { $in: parent.taskIds}});
            }

        }

    })
})

module.exports = {
    TaskType,
    UserType,
    BoardType
};