const graphql = require("graphql")
const {
    GraphQLString,
    GraphQLID,
    GraphQLBoolean,
} = graphql

const _ = require('lodash');

const Board = require('../../../models/board.js')
const User = require('../../../models/user.js');
const { UserType } = require("../../objectTypes.js");

const addUserToBoardMutation = {
    type: UserType,
    args: {
        boardId: {
            type: GraphQLID
        },
        userName: {
            type: GraphQLString
        }
    },
    async resolve(parent, args, req) {


        User.find({name: args.userName}).then(async (res) => {

            if(res.length){
                console.log(res[0]._id)
                await Board.updateOne({
                    '_id': args.boardId
                }, { $push: {userIds: res[0]._id }})
                
        
                await User.updateOne({
                    '_id': res[0]._id
                }, { $push: {boardIds: args.boardId }})      

                return true

            } else {
                return false
            }
        })
    }
}

module.exports = { addUserToBoardMutation }