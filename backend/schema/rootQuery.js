const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
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
        
        boardsByUserId: {
            type: new GraphQLList(BoardType),
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Board.find({$or: [ {'ownerId': args.id}, {'userIds': args.id} ] });            
            }
        },

        tasksByBoardId: {
            type: new GraphQLList(TaskType),
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Task.find({'boardId': args.id});            
            }
        },
        
        userByUsername: {
            type: UserType,
            args: {
                name: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                return User.findOne({'name': args.name});
            }
        }
    }
});

module.exports = RootQuery;