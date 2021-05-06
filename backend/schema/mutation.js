const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLOutputObjectType
} = graphql;

const {
    GraphQLDateTime
} = require('graphql-iso-date');

const User = require('../models/user.js');
const Task = require('../models/task.js');
const Board = require('../models/board.js');

const {
    TaskType,
    UserType,
    BoardType,
    AuthenticationType
} = require('./objectTypes.js');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
            resolve(parent, args, req) {
                if(!req.isAuthenticated){
                    throw new Error('Unauthenticated');
                }
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
        },

        signUp: {
            type: UserType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                password: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            async resolve(parent, args) {
                const password = await bcrypt.hash(args.password, 10)

                const user = new User({
                    name: args.name,
                    password: password
                })

                const token = jwt.sign({
                    userId: user.id
                }, process.env.JWT_SECRET_KEY, {
                    expiresIn: '1h'
                })

                console.log(token)
                return user.save();
            }
        },

        logIn: {
            type: AuthenticationType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                password: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            async resolve(parent, args) {
                const user = await User.findOne({
                    name: args.name
                })

                if (!user) {
                    throw new Error('No user with that name')
                }

                const valid = await bcrypt.compare(args.password, user.password)

                if (!valid) {
                    throw new Error('Incorrect password')
                }

                const token = jwt.sign({
                    userId: user.id,
                    name: args.name,
                    password: args.password
                }, process.env.JWT_SECRET_KEY, {
                    expiresIn: '1h'
                })

                console.log(token);
                return {userId: user.id, accessToken: token, refreshToken: token}
            }
        }
    }
})

module.exports = Mutation;