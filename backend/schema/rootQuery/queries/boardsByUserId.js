const graphql = require("graphql");
const {
    GraphQLID,
    GraphQLList,
} = graphql;

const Board = require('../../../models/board.js');
const { BoardType } = require('../../objectTypes.js');

const boardsByUserIdQuery = {
    type: new GraphQLList(BoardType),
    args: {
        id: {
            type: GraphQLID
        }
    },
    resolve(parent, args) {
        return Board.find({$or: [ {'ownerId': args.id}, {'userIds': args.id} ] });            
    }
}

module.exports = { boardsByUserIdQuery }