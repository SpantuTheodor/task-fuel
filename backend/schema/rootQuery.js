const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
} = graphql;

const User = require('../models/user.js');
const Task = require('../models/task.js');
const Board = require('../models/board.js');

const {
    TaskType,
    UserType,
    BoardType
} = require('./objectTypes.js');


const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {

        task: {
            type: TaskType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Task.findById(args.id);
            }
        },

        user: {
            type: UserType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return User.findById(args.id);
            }
        },

        board: {
            type: BoardType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Board.findById(args.id);
            }
        },

        boardsByUserId: {
            type: new GraphQLList(BoardType),
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Board.find({}).find({ownerId: args.id});            }
        },

        tasks: {
            type: new GraphQLList(TaskType),
            resolve(parent, args) {
                return Task.find({});
            }
        },


        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({});
            }
        },

        boards: {
            type: new GraphQLList(BoardType),
            resolve(parent, args) {
                return Board.find({});
            }
        },
        
    }
});

module.exports = RootQuery;