const graphql = require("graphql")
const {
    GraphQLString,
    GraphQLID,
    GraphQLBoolean,
} = graphql

const _ = require('lodash');

const Board = require('../../../models/board.js')
const User = require('../../../models/user.js')

const addUserToBoardMutation = {
    type: GraphQLBoolean,
    args: {
        boardId: {
            type: GraphQLID
        },
        userName: {
            type: GraphQLString
        }
    },
    async resolve(parent, args, req) {

        if(!req.isAuthenticated){
            throw new Error('Unauthenticated')
        }

        User.find({name: args.userName}).then(async (res) => {

            console.log(res[0]._id)

            
            await Board.updateOne({
                '_id': args.boardId
            }, { $push: {userIds: res[0]._id }}, { upsert: true })
            
    
            await User.updateOne({
                '_id': res[0]._id
            }, { $push: {boardIds: args.boardId }}, { upsert: true })      
            
        })
    }
}

module.exports = { addUserToBoardMutation }