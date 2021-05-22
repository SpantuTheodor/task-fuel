const graphql = require("graphql");
const { GraphQLID } = graphql;

const Board = require('../../../models/board.js');
const { BoardType } = require('../../objectTypes.js');

const boardQuery = {
    type: BoardType,
    args: {
        id: {
            type: GraphQLID
        }
    },
    resolve(parent, args) {
        return Board.findById(args.id);
    }
}

module.exports = { boardQuery }