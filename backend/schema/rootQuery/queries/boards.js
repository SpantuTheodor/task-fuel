
const graphql = require("graphql");
const { GraphQLList } = graphql;


const Board = require('../../../models/board.js');
const { BoardType } = require('../../objectTypes.js');

const boardsQuery = {
    type: new GraphQLList(BoardType),
    resolve(parent, args, req) {
        
        if(!req.isAuthenticated){
            throw new Error('Unauthenticated')
        }

        return Board.find({});
    }
}

module.exports = { boardsQuery }